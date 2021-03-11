import { object, text } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@ngf/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ForceDirectedGraphCardComponent } from './force-directed-graph-card.component';

export default {
  title: 'ForceDirectedGraphCardComponent'
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
  component: ForceDirectedGraphCardComponent,
  props: {
    title: text('title', 'Friends Network'),
    friendsGraph: object('friendsGraph', mockForceDirectedGraph)
  }
});

const mockForceDirectedGraph = {
  links: [
    {
      source: 'Cwqrxslm',
      target: 'Ipc'
    },
    {
      source: 'Cwqrxslm',
      target: 'Hewkai'
    },
    {
      source: 'Ioxru',
      target: 'Ipc'
    },
    {
      source: 'Dvyd',
      target: 'Hewkai'
    },
    {
      source: 'Dvyd',
      target: 'Ioxru'
    },
    {
      source: 'Dvyd',
      target: 'Ipc'
    },
    {
      source: 'Dvyd',
      target: 'Cwqrxslm'
    },
    {
      source: 'Dhs',
      target: 'Ipc'
    },
    {
      source: 'Dhs',
      target: 'Ioxru'
    },
    {
      source: 'Dhs',
      target: 'Dvyd'
    },
    {
      source: 'Dhs',
      target: 'Hewkai'
    },
    {
      source: 'Dhs',
      target: 'Cwqrxslm'
    }
  ],
  nodes: [
    {
      value: 'Ipc'
    },
    {
      value: 'Hewkai'
    },
    {
      value: 'Cwqrxslm'
    },
    {
      value: 'Ioxru'
    },
    {
      value: 'Dvyd'
    },
    {
      value: 'Dhs'
    }
  ]
};
