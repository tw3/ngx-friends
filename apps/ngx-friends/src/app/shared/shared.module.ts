import { NgModule } from '@angular/core';
import { ChartCardsModule } from './chart-cards/chart-cards.module';

@NgModule({
  imports: [
    ChartCardsModule
  ],
  declarations: [],
  exports: [
    ChartCardsModule
  ]
})
export class SharedModule {
}
