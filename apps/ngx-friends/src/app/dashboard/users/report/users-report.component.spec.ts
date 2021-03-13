import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersReportComponent } from './users-report.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UsersReportComponent', () => {
  let fixture: ComponentFixture<UsersReportComponent>;
  let comp: UsersReportComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [UsersReportComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should have the proper title', () => {
    const h2Elem = fixture.debugElement.query(By.css('h2'));
    expect(h2Elem.nativeElement.innerHTML.trim()).toBe('User Report');
  });

  it('should have user form subview', () => {
    const elem = fixture.debugElement.query(By.css('ngf-users-report-user-form'));
    expect(elem).toBeTruthy();
  });

  it('should have report graphs subview', () => {
    const elem = fixture.debugElement.query(By.css('ngf-users-report-graphs'));
    expect(elem).toBeTruthy();
  });
});
