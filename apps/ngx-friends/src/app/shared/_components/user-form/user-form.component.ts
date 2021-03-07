import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { User } from '../../_models/user.model';
import { FormState } from '../../_models/form-state.enum';

interface FormUser {
  name: string;
  age: number;
  weight: number;
  friendNameInput: string;
}

@Component({
  selector: 'tw3-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() user: User; // TODO: Initialize form based on this input, update in ngOnChanges
  @Input() shouldEnableFriendInput = true;
  @Input() friendNameOptions$: Observable<string[]>;

  @Output() readonly userSaved: EventEmitter<User> = new EventEmitter<User>();

  // public observables
  readonly friendNameInputValue$: Observable<string>;
  readonly selectedFriendNames$: Observable<string[]>;

  formGroup: FormGroup;
  isFormValid: boolean;

  selectedFriendNames: string[] = [];

  private formState: FormState;

  @ViewChild('formElem')
  private readonly formElem: HTMLFormElement;
  @ViewChild('friendNameInput')
  private readonly friendNameInputElem: ElementRef;
  @ViewChild('friendNameInput', { read: MatAutocompleteTrigger })
  private readonly autoCompleteTrigger: MatAutocompleteTrigger;

  private readonly friendNameInputValueSubject: Subject<string> = new Subject<string>();
  private readonly selectedFriendNamesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.friendNameInputValue$ = this.friendNameInputValueSubject.asObservable();
    this.selectedFriendNames$ = this.selectedFriendNamesSubject.asObservable();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setFormState(FormState.READY);
    this.buildForm();
  }

  ngAfterViewInit(): void {
    // Would prefer to execute this in buildForm() but there seems to be a bug
    // in Angular that doesn't allow this
    this.enableOrDisableFriendNameInput();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get isReady(): boolean {
    return this.formState === FormState.READY;
  }

  get isSaving(): boolean {
    return this.formState === FormState.SAVING;
  }

  get isSaved(): boolean {
    return this.formState === FormState.SAVED;
  }

  get isError(): boolean {
    return this.formState === FormState.ERROR;
  }

  onRemovedUserFriend(friendName: string): void {
    const idx: number = this.selectedFriendNames.indexOf(friendName);
    if (idx >= 0) {
      this.selectedFriendNames.splice(idx, 1);
    }
    this.selectedFriendNamesSubject.next(this.selectedFriendNames);
  }

  onAvailableFriendSelected(event: MatAutocompleteSelectedEvent): void {
    const friendName: string = event.option.viewValue;
    this.selectedFriendNames.push(friendName);
    this.selectedFriendNamesSubject.next(this.selectedFriendNames);
  }

  onFormSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    // Get the new user object from the form
    const formUser: FormUser = this.formGroup.value as FormUser;
    const newUser: User = {
      name: formUser.name,
      age: formUser.age,
      weight: formUser.weight,
      friendNames: this.selectedFriendNames
    };

    // Emit the new user
    this.userSaved.emit(newUser);
  }

  onClickReset(evt: Event): void {
    this.resetForm();
    evt.preventDefault(); // don't submit
  }

  setFormState(formState: FormState, message?: string): void {
    this.formState = formState;

    // Enable/disable form
    if (this.formGroup) {
      if (this.formState === FormState.SAVING) {
        this.formGroup.disable();
        return;
      }
      this.formGroup.enable();
    }

    // Reset the form if appropriate
    if (this.formState === FormState.SAVED) {
      this.resetForm();
    }
  }

  // private methods: init

  private buildForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.user && this.user.name,
        [Validators.required]
      ),
      age: new FormControl(this.user && this.user.age,
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(3)
        ])
      ),
      weight: new FormControl(this.user && this.user.weight,
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(3)
        ])
      ),
      friendNameInput: new FormControl()
    });

    this.selectedFriendNames = this.user && this.user.friendNames || [];
    this.selectedFriendNamesSubject.next(this.selectedFriendNames);

    // Listen for changes to form state
    this.formGroup.statusChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.onFormGroupStatusChanged.bind(this)
    });

    // React to friend name input value changes
    this.formGroup.controls['friendNameInput'].valueChanges.pipe(
      distinctUntilChanged(),
      filter(friendNameValue => !!friendNameValue),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.onFriendNameValueChanged.bind(this));
  }

  private onFormGroupStatusChanged(status: string): void {
    this.updateIsFormValid();
  }

  private onFriendNameValueChanged(friendNameValue: string): void {
    this.friendNameInputValueSubject.next(friendNameValue);
  }

  // private methods: friend name input

  private enableOrDisableFriendNameInput(): void {
    const shouldEnable = this.getShouldEnableFriendNameInput();
    if (shouldEnable) {
      this.formGroup.controls['friendNameInput'].enable();
    } else {
      this.formGroup.controls['friendNameInput'].disable();
    }
  }

  private getShouldEnableFriendNameInput(): boolean {
    // Enable when friends exist to add
    return this.shouldEnableFriendInput;
  }

  // private methods: helper

  private updateIsFormValid(): void {
    this.isFormValid = this.isControlValid(this.formGroup);
  }

  private isControlValid(c: AbstractControl): boolean {
    return !c.invalid && !c.pending;
  }

  private resetForm(): void {
    this.selectedFriendNames = [];
    this.selectedFriendNamesSubject.next(this.selectedFriendNames);
    this.formElem.resetForm();
    this.formGroup.markAsUntouched();
  }

}
