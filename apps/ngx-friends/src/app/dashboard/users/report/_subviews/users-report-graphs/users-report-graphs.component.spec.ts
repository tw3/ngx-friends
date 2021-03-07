import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReportGraphsComponent } from './users-report-graphs.component';

describe('UsersReportGraphsComponent', () => {
  let component: UsersReportGraphsComponent;
  let fixture: ComponentFixture<UsersReportGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersReportGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
