import { TestBed } from '@angular/core/testing';
import { UsersReportComponent } from './users-report.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [UsersReportComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersReportComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
