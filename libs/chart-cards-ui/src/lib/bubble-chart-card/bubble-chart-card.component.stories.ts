import { object, text } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@ngf/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BubbleChartDataPoint } from './bubble-chart-data-point.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BubbleChartCardComponent } from './bubble-chart-card.component';

export default {
  title: 'BubbleChartCardComponent'
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
  component: BubbleChartCardComponent,
  props: {
    title: text('title', 'Age vs Weight (# Friends)'),
    xAxisLabel: text('xAxisLabel', 'Age'),
    yAxisLabel: text('yAxisLabel', 'Weight'),
    results: object('results', mockBubbleChartDataPoints)
  }
});

const mockBubbleChartDataPoints: BubbleChartDataPoint[] = [
  {
    name: 'Ipc',
    series: [{ name: '', x: 4, y: 219, r: 0 }]
  },
  {
    name: 'Hewkai',
    series: [{ name: '', x: 20, y: 113, r: 0 }]
  },
  {
    name: 'Cwqrxslm',
    series: [{ name: '', x: 55, y: 57, r: 2 }]
  },
  {
    name: 'Ioxru',
    series: [{ name: '', x: 51, y: 49, r: 1 }]
  },
  {
    name: 'Dvyd',
    series: [{ name: '', x: 96, y: 202, r: 4 }]
  },
  {
    name: 'Dhs',
    series: [{ name: '', x: 99, y: 282, r: 5 }]
  }
];
