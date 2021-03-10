import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleChartCardComponent } from './bubble-chart-card/bubble-chart-card.component';
import { CommonMaterialModule } from '@ngf/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart-card/horizontal-bar-chart-card.component';
import { ForceDirectedGraphCardComponent } from './force-directed-graph-card/force-directed-graph-card.component';

const components = [
  BubbleChartCardComponent,
  HorizontalBarChartCardComponent,
  ForceDirectedGraphCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    NgxChartsModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class ChartCardsUiModule {
}
