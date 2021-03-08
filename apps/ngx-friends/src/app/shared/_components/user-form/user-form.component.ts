import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UserEntity } from '../../_models/user.model';
import { FormState } from '../../_models/form-state.enum';
import { RandomUtil } from '../../_util/random_util';

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
export class UserFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() allUsers: UserEntity[];
  @Output() readonly userSaved: EventEmitter<UserEntity> = new EventEmitter<UserEntity>();

  formGroup: FormGroup;
  isFormValid: boolean;
  selectedFriendNames: string[] = [];
  friendNameAutocompleteOptions: string[];

  @ViewChild('formElem') private readonly formElem: HTMLFormElement;
  @ViewChild('friendNameInput') private readonly friendNameInputElem: ElementRef;
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  private formState: FormState;

  constructor() {
  }

  ngOnInit(): void {
    this.setFormState(FormState.READY);
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.formGroup || !changes['allFriendNames']) {
      return;
    }
    if (this.friendsExist) {
      this.formGroup.controls['friendNameInput'].enable();
    } else {
      this.formGroup.controls['friendNameInput'].disable();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get friendsExist(): boolean {
    return (this.allUsers != null) && this.allUsers.length > 0;
  }

  get isFormBusy(): boolean {
    return (
      this.formState === FormState.SAVING ||
      this.formState === FormState.LOADING
    );
  }

  onClickPopulateRandomData(evt: Event): void {
    this.formGroup.patchValue({
      name: RandomUtil.stringGen(),
      age: RandomUtil.getRandomInt(1, 100),
      weight: RandomUtil.getRandomInt(8, 400),
      friendNameInput: ''
    });
    this.selectedFriendNames = RandomUtil.getRandomArraySubset(this.allUsers).map(u => u.name);
    evt.preventDefault(); // don't submit
  }

  onRemovedUserFriend(friendName: string): void {
    this.selectedFriendNames = this.selectedFriendNames.filter((name: string) => {
      return (name !== friendName);
    });
  }

  onAvailableFriendSelected(event: MatAutocompleteSelectedEvent): void {
    const friendName: string = event.option.viewValue;
    this.selectedFriendNames = [...this.selectedFriendNames, friendName];
  }

  onFormSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    // Get the new user object from the form
    const formUser: FormUser = this.formGroup.value as FormUser;
    const newUser: UserEntity = {
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
      if (this.formState === FormState.SAVING || this.formState === FormState.LOADING) {
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
      name: new FormControl('',
        [Validators.required]
      ),
      age: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(3)
        ])
      ),
      weight: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(3)
        ])
      ),
      friendNameInput: new FormControl()
    });

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

  // private methods: friend name input

  private onFriendNameValueChanged(friendNameInputText?: string): void {
    if (friendNameInputText === undefined) {
      friendNameInputText = this.friendNameInputElem.nativeElement.value;
    }
    this.friendNameAutocompleteOptions = friendNameInputText ?
      this.getMatchingAvailableFriendNames(friendNameInputText) :
      this.getAvailableFriendNames().slice();
  }

  private getMatchingAvailableFriendNames(inputText: string): string[] {
    inputText = inputText.toLowerCase();
    return this.getAvailableFriendNames()
      .filter((availableFriendName: string) => {
        availableFriendName = availableFriendName.toLowerCase();
        const isOptionMatch: boolean = availableFriendName.startsWith(inputText);
        return isOptionMatch;
      });
  }

  private getAvailableFriendNames(): string[] {
    if (!this.allUsers) {
      return [];
    }
    return this.allUsers
      .map((user: UserEntity) => user.name)
      .filter((userName: string) => {
        return !this.selectedFriendNames.includes(userName);
      });
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
    this.formElem.resetForm();
    this.formGroup.markAsUntouched();
  }

}
