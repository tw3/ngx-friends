import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from './_modules/common-material.module';
import { NoContentComponent } from './_components/no-content/no-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './_components/user-form/user-form.component';

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
export class SharedModule {
}
