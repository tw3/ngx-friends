import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from './_modules/common-material.module';
import { NoContentComponent } from './_components/no-content/no-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './_components/user-form/user-form.component';
import { ChartCardsModule } from './chart-cards/chart-cards.module';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartCardsModule
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
    ChartCardsModule,
    NoContentComponent,
    UserFormComponent
  ]
})
export class SharedModule {
}
