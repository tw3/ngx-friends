import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BubbleChartCardComponent } from './bubble-chart-card.component';
import { CommonMaterialModule } from '@ngf/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BubbleChartCardComponent', () => {
  let component: BubbleChartCardComponent;
  let fixture: ComponentFixture<BubbleChartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BubbleChartCardComponent],
      imports: [
        NoopAnimationsModule,
        CommonMaterialModule,
        NgxChartsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartCardComponent);
    component = fixture.componentInstance;
    component.title = 'Bubble Chart Card';
    component.xAxisLabel = 'Age';
    component.yAxisLabel = 'Weight';
    component.results = [
      {
        name: '',
        series: [
          {
            name: 'Tammy',
            x: 10,
            y: 20,
            r: 5
          },
          {
            name: 'Evan',
            x: 15,
            y: 25,
            r: 15
          }
        ]
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
