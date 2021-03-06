import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from './material/common-material.module';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  exports: [
    CommonMaterialModule
  ]
})
export class SharedModule {
}
