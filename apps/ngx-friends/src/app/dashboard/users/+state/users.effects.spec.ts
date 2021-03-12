import { TestBed } from '@angular/core/testing';

import { EMPTY, Observable, of as observableOf, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { UsersEffects } from './users.effects';
import * as UsersActions from './users.actions';
import { Action } from '@ngrx/store';
import { UsersApiService } from '../_services/users-api.service';
import { UserEntity } from '@ngf/shared-ui';
import { NotificationService } from '../../../core/_services/notification-service/notification.service';
import { ForceDirectedGraph } from '@ngf/chart-cards-ui';

describe('UsersEffects', () => {
  let actions$: Observable<Action>;
  let effects: UsersEffects;
  let usersApiService: UsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UsersEffects,
        DataPersistence,
        { provide: UsersApiService, useClass: MockUsersApiService },
        { provide: NotificationService, useClass: MockNotificationService },
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(UsersEffects);
    usersApiService = TestBed.inject(UsersApiService);
  });

  describe('fetchUsers$', () => {
    it('should trigger UserActions.usersFetchedFromUserReportsSuccess with result from getAllUsers()', () => {
      actions$ = hot('-a-|', { a: UsersActions.fetchUsersFromUserReports() });

      const users: UserEntity[] = [{}] as UserEntity[];
      spyOn(usersApiService, 'getAllUsers').and.returnValue(observableOf(users));

      const expected = hot('-a-|', {
        a: UsersActions.usersFetchedFromUserReportsSuccess({ users })
      });

      expect(effects.fetchUsers$).toBeObservable(expected);
    });
  });

  describe('fetchFriendsGraph$', () => {
    it('should trigger UsersActions.friendsGraphFetchedFromUserReportsSuccess with result from getFriendsGraph()', () => {
      actions$ = hot('-a-|', { a: UsersActions.fetchFriendsGraphFromUserReports() });

      const friendsGraph: ForceDirectedGraph = {} as ForceDirectedGraph;
      spyOn(usersApiService, 'getFriendsGraph').and.returnValue(observableOf(friendsGraph));

      const expected = hot('-a-|', {
        a: UsersActions.friendsGraphFetchedFromUserReportsSuccess({ friendsGraph })
      });

      expect(effects.fetchFriendsGraph$).toBeObservable(expected);
    });
  });

  describe('requestAddUser$', () => {
    let notificationService: NotificationService;
    beforeEach(() => {
      notificationService = TestBed.inject(NotificationService);
    });

    it('should trigger UsersActions.userAddedFromUserReportsSuccess with success result from addUser()', () => {
      const user: UserEntity = {
        name: 'Jasmine'
      } as UserEntity;
      actions$ = hot('-a-|', { a: UsersActions.requestAddUserFromUserReports({ user }) });

      spyOn(usersApiService, 'addUser').and.returnValue(observableOf(user));

      const showSuccessToastSpy = spyOn(notificationService, 'showSuccessToast');

      const expected = hot('-a-|', {
        a: UsersActions.userAddedFromUserReportsSuccess({ user })
      });

      expect(effects.requestAddUser$).toBeObservable(expected);
      expect(showSuccessToastSpy).toHaveBeenCalledWith(`User '${user.name}' added successfully`);
    });

    it('should trigger UsersActions.userAddedFromUserReportsFailed with error result from addUser()', () => {
      const user: UserEntity = {
        name: 'Jasmine'
      } as UserEntity;
      actions$ = hot('-a-|', { a: UsersActions.requestAddUserFromUserReports({ user }) });

      const errorMessage = 'Jasmine is already a user';
      const error: Error = new Error(errorMessage);
      spyOn(usersApiService, 'addUser').and.returnValue(throwError(error));

      const showErrorToastSpy = spyOn(notificationService, 'showErrorToast');

      const expected = hot('-a-|', {
        a: UsersActions.userAddedFromUserReportsFailed({ error: errorMessage })
      });

      expect(effects.requestAddUser$).toBeObservable(expected);
      expect(showErrorToastSpy).toHaveBeenCalledWith(`User '${user.name}' add failed: ${errorMessage}`);
    });
  });


});

class MockNotificationService {
  showSuccessToast() {
  }

  showErrorToast() {
  }
}

class MockUsersApiService {
  getAllUsers() {
    return EMPTY;
  }

  getFriendsGraph() {
    return EMPTY;
  }

  addUser() {
    return EMPTY;
  }
}
