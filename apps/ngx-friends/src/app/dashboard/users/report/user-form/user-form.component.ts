import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tw3-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

}
