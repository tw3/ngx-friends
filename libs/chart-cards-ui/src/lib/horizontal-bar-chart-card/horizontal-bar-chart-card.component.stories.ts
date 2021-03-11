import { object, text } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@ngf/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart-card.component';
import { HorizontalBarChartDataPoint } from './horizontal-bar-chart-data-point.model';

export default {
  title: 'HorizontalBarChartCardComponent'
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      CommonMaterialModule,
      NgxChartsModule
    ]
  },
  component: HorizontalBarChartCardComponent,
  props: {
    title: text('title', 'User Weights'),
    xAxisLabel: text('xAxisLabel', 'Weight'),
    yAxisLabel: text('yAxisLabel', 'Name'),
    results: object('results', mockHorizontalBarChartDataPoint)
  }
});

const mockHorizontalBarChartDataPoint: HorizontalBarChartDataPoint[] = [
  {
    name: 'Ipc',
    value: 219
  },
  {
    name: 'Hewkai',
    value: 113
  },
  {
    name: 'Cwqrxslm',
    value: 57
  },
  {
    name: 'Ioxru',
    value: 49
  },
  {
    name: 'Dvyd',
    value: 202
  },
  {
    name: 'Dhs',
    value: 282
  }
];
