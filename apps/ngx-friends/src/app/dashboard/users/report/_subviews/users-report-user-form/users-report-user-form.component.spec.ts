import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReportUserFormComponent } from './users-report-user-form.component';

describe('UsersReportUserFormComponent', () => {
  let component: UsersReportUserFormComponent;
  let fixture: ComponentFixture<UsersReportUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersReportUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
