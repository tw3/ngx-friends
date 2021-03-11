import { object, text } from '@storybook/addon-knobs';
import { UserFormComponent } from './user-form.component';
import { UserEntity } from '../../models/user-entity.model';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@ngf/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'UserFormComponent'
};

const mockAllUsers: UserEntity[] = [
  {
    name: 'abc',
    age: 12,
    weight: 34,
    friendNames: ['def']
  },
  {
    name: 'def',
    age: 89,
    weight: 77,
    friendNames: ['abc']
  }
];

export const primary = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      CommonMaterialModule,
      FormsModule,
      ReactiveFormsModule
    ]
  },
  component: UserFormComponent,
  props: {
    allUsers: object('allUsers', mockAllUsers),
    formState: text('formState', 'READY')
  }
});
