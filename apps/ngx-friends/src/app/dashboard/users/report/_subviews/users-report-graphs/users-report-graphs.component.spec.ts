import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersReportGraphsComponent } from './users-report-graphs.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialUsersState } from '../../../+state/users.reducer';

describe('UsersReportGraphsComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<UsersReportGraphsComponent>;
  let comp: UsersReportGraphsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [UsersReportGraphsComponent],
      providers: [
        provideMockStore({ initialState: initialUsersState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportGraphsComponent);
    comp = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  // https://ngrx.io/guide/store/testing
});
