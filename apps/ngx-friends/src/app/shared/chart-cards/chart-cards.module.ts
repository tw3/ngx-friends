import { NgModule } from '@angular/core';
import { BubbleChartCardComponent } from './bubble-chart/bubble-chart-card.component';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart/horizontal-bar-chart-card.component';
import { CommonMaterialModule } from '../_modules/common-material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ForceDirectedGraphComponent } from './force-directed-graph/force-directed-graph.component';

const components = [
  BubbleChartCardComponent,
  HorizontalBarChartCardComponent,
  ForceDirectedGraphComponent
];

@NgModule({
  imports: [
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
export class ChartCardsModule {
}
