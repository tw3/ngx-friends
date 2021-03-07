import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'tw3-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() allFriendNames: string[];

  formGroup: FormGroup;
  isFormValid: boolean;
  isFormSaving = false;

  userFriendNames: string[] = []; // ['John', 'Sally'];
  friendNameAutocompleteOptions: string[] = []; // ['Abraham', 'Beth'];

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
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
    console.log('TODO: onRemovedUserFriend', friendName);
  }

  onAvailableFriendSelected(event: MatAutocompleteSelectedEvent): void {
    console.log('TODO: onAvailableFriendSelected', event);
  }

  onFormSave(): void {
    console.log('TODO: onFormSave');
  }

  // private methods: init

  private buildForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(3)
      ])),
      weight: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(3)
      ])),
      friendNameInput: new FormControl({ value: '', disabled: true })
    });

    this.formGroup.statusChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.onFormGroupStatusChanged.bind(this));
  }

  private onFormGroupStatusChanged(status: string): void {
    this.updateIsFormValid();
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
    return (
      Array.isArray(this.allFriendNames) &&
      (this.allFriendNames.length > 0)
    );
  }

  // private methods: helper

  private updateIsFormValid(): void {
    this.isFormValid = this.isControlValid(this.formGroup);
  }

  private isControlValid(c: AbstractControl): boolean {
    return !c.invalid && !c.pending;
  }

}
