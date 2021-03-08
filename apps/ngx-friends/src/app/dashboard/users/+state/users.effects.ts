import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../_services/users-api.service';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserEntity } from '../../../shared/_models/user.model';
import { NotificationService } from '../../../core/_services/notification-service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs';
import { ForceDirectedGraph } from '../../../shared/_models/force-directed-graph.model';

@Injectable()
export class UsersEffects {
  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchUsersFromUserReports),
      mergeMap(() => {
        return this.usersApiService.getAllUsers().pipe(
          map((users: UserEntity[]) => UsersActions.usersFetchedFromUserReportsSuccess({ users }))
        );
      })
    );
  });

  fetchFriendsGraph$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchFriendsGraphFromUserReports),
      mergeMap(() => {
        return this.usersApiService.getFriendsGraph().pipe(
          map((friendsGraph: ForceDirectedGraph) => UsersActions.friendsGraphFetchedFromUserReportsSuccess({ friendsGraph }))
        );
      })
    );
  });

  requestAddUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.requestAddUserFromUserReports),
      mergeMap(({ user }: { user: UserEntity }) => {
        return this.usersApiService.addUser(user).pipe(
          map((users: UserEntity[]) => {
            this.notificationService.showSuccessToast(`User '${user.name}' added successfully`);
            return UsersActions.userAddedFromUserReportsSuccess({ user });
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
