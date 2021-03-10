import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoContentComponent } from './no-content/no-content.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CommonMaterialModule } from '@ngf/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NoContentComponent,
    UserFormComponent
  ],
  exports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NoContentComponent,
    UserFormComponent
  ]
})
export class SharedUiModule {
}
