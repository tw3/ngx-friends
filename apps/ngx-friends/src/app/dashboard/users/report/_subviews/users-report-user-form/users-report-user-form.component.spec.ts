import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialUsersState } from '../../../+state/users.reducer';
import { UsersReportUserFormComponent } from './users-report-user-form.component';
import { UserEntity } from '@ngf/shared-ui';
import * as UsersActions from '../../../+state/users.actions';

describe('UsersReportUserFormComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<UsersReportUserFormComponent>;
  let comp: UsersReportUserFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [UsersReportUserFormComponent],
      providers: [
        provideMockStore({ initialState: initialUsersState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportUserFormComponent);
    comp = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  describe('onUserSaved', () => {
    it('should dispatch requestAddUserFromUserReports with user data', () => {
      const user: UserEntity = {
        name: 'Jessica', age: 37, weight: 166, friendNames: ['Jordan']
      };
      const action = UsersActions.requestAddUserFromUserReports({ user });
      const dispatchSpy = spyOn(store, 'dispatch');

      comp.onUserSaved(user);

      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });
  });

});
