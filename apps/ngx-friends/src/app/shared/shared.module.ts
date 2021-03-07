import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from './_modules/common-material.module';
import { NoContentComponent } from './_components/no-content/no-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NoContentComponent
  ],
  exports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NoContentComponent
  ]
})
export class SharedModule {
}
