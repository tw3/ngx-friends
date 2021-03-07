import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'tw3-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  isFormValid: boolean;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

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
      ]))
    });

    this.formGroup.statusChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.onFormGroupStatusChanged.bind(this));
  }

  private onFormGroupStatusChanged(status: string): void {
    this.updateIsFormValid();
  }

  private updateIsFormValid(): void {
    this.isFormValid = this.isControlValid(this.formGroup);
  }

  private isControlValid(c: AbstractControl): boolean {
    return !c.invalid && !c.pending;
  }

}
