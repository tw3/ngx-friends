import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../_services/users-api.service';
import * as UsersActions from './users.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserEntity } from '@ngf/shared-ui';
import { NotificationService } from '../../../core/_services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs';
import { ForceDirectedGraph } from '@ngf/chart-cards-ui';

@Injectable()
export class UsersEffects {
  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchUsersFromUserReports),
      switchMap(() => {
        return this.usersApiService.getAllUsers().pipe(
          map((users: UserEntity[]) => {
            return UsersActions.usersFetchedFromUserReportsSuccess({ users });
          })
        );
      })
    );
  });

  fetchFriendsGraph$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchFriendsGraphFromUserReports),
      switchMap(() => {
        return this.usersApiService.getFriendsGraph().pipe(
          map((friendsGraph: ForceDirectedGraph) => {
            return UsersActions.friendsGraphFetchedFromUserReportsSuccess({ friendsGraph });
          })
        );
      })
    );
  });

  requestAddUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.requestAddUserFromUserReports),
      switchMap(({ user }: { user: UserEntity }) => {
        return this.usersApiService.addUser(user).pipe(
          map((resultUser: UserEntity) => {
            this.notificationService.showSuccessToast(`User '${resultUser.name}' added successfully`);
            return UsersActions.userAddedFromUserReportsSuccess({ user: resultUser });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMessage: string = error.message;
            this.notificationService.showErrorToast(`User '${user.name}' add failed: ${errorMessage}`);
            return observableOf(UsersActions.userAddedFromUserReportsFailed({ error: errorMessage }));
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
