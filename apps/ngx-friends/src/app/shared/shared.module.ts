import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from './material/common-material.module';
import { NoContentComponent } from './_components/no-content/no-content.component';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  declarations: [
    NoContentComponent
  ],
  exports: [
    CommonMaterialModule,
    NoContentComponent
  ]
})
export class SharedModule {
}
