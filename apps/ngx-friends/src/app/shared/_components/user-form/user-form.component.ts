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
import { Observable, Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { User } from '../../_models/user.model';

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

  readonly friendNameInputValueChange$: Observable<string>;

  formGroup: FormGroup;
  isFormValid: boolean;
  isFormSaving = false;

  selectedUserFriendNames: string[] = []; // ['John', 'Sally'];

  @ViewChild('formElem')
  private readonly formElem: HTMLFormElement;
  @ViewChild('friendNameInput')
  private readonly friendNameInputElem: ElementRef;
  @ViewChild('friendNameInput', { read: MatAutocompleteTrigger })
  private readonly autoCompleteTrigger: MatAutocompleteTrigger;

  private readonly friendNameInputValueChangeSubject: Subject<string> = new Subject<string>();
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.friendNameInputValueChange$ = this.friendNameInputValueChangeSubject.asObservable();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
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

  onRemovedUserFriend(friendName: string): void {
    const idx: number = this.selectedUserFriendNames.indexOf(friendName);
    if (idx >= 0) {
      this.selectedUserFriendNames.splice(idx, 1);
    }
  }

  onAvailableFriendSelected(event: MatAutocompleteSelectedEvent): void {
    const friendName: string = event.option.viewValue;
    this.selectedUserFriendNames.push(friendName);
  }

  onFormSave(): void {
    if (!this.isFormValid) {
      return;
    }

    // Get the new user object from the form
    const formUser: FormUser = this.formGroup.value as FormUser;
    const newUser: User = {
      name: formUser.name,
      age: formUser.age,
      weight: formUser.weight,
      friendNames: this.selectedUserFriendNames
    };

    // Emit the new user
    this.userSaved.emit(newUser);
  }

  onClickReset(evt: Event): void {
    this.resetForm();
    evt.preventDefault(); // don't submit
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

    this.selectedUserFriendNames = this.user && this.user.friendNames;

    // Listen for changes to form state
    this.formGroup.statusChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.onFormGroupStatusChanged.bind(this));

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
    this.friendNameInputValueChangeSubject.next(friendNameValue);
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
    this.selectedUserFriendNames = [];
    this.formElem.resetForm();
    this.formGroup.markAsUntouched();
  }

}
