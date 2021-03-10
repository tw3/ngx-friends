import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorizontalBarChartCardComponent } from './horizontal-bar-chart-card.component';
import { CommonMaterialModule } from '@ngf/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('HorizontalBarChartCardComponent', () => {
  let component: HorizontalBarChartCardComponent;
  let fixture: ComponentFixture<HorizontalBarChartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalBarChartCardComponent],
      imports: [
        CommonMaterialModule,
        NgxChartsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalBarChartCardComponent);
    component = fixture.componentInstance;
    component.title = 'Horizontal Bar Chart Card';
    component.xAxisLabel = 'Age';
    component.yAxisLabel = 'Name';
    component.results = [
      {
        name: 'Tammy',
        value: 10
      },
      {
        name: 'Evan',
        value: 15
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
