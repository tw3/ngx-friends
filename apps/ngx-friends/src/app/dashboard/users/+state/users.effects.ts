import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../_services/users-api.service';
import * as UserActions from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserEntity } from '../../../shared/_models/user.model';
import { NotificationService } from '../../../core/_services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUsersFromUserReports),
      mergeMap(() => {
        return this.usersApiService.getAllUsers().pipe(
          map((users: UserEntity[]) => UserActions.usersFetchedFromUserReportsSuccess({ users }))
        );
      })
    );
  });

  requestAddUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.requestAddUserFromUserReports),
      mergeMap(({ user }: { user: UserEntity }) => {
        return this.usersApiService.addUser(user).pipe(
          map((users: UserEntity[]) => {
            this.notificationService.showSuccessToast(`User '${user.name}' added successfully`);
            return UserActions.userAddedFromUserReportsSuccess({ user });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage: string = error.message;
            this.notificationService.showErrorToast(`User '${user.name}' add failed: ${errorMessage}`);
            return observableOf(UserActions.userAddedFromUserReportsFailed({ error: errorMessage }));
          })
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly usersApiService: UsersApiService,
    private readonly notificationService: NotificationService
  ) {
  }

}
