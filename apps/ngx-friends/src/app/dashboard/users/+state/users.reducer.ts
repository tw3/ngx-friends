import { ForceDirectedGraph } from '@ngf/chart-cards-ui';
import { FormState, UserEntity } from '@ngf/shared-ui';
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { UsersState } from './users.state';

export const initialUsersState: UsersState = {
  users: [],
  friendsGraph: {
    links: [],
    nodes: []
  },
  formState: FormState.READY
};

export const usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.usersFetchedFromUserReportsSuccess, (state: UsersState, action: { users: UserEntity[] }) => {
    return { ...state, users: action.users };
  }),

  on(UsersActions.friendsGraphFetchedFromUserReportsSuccess, (state: UsersState, action: { friendsGraph: ForceDirectedGraph }) => {
    return { ...state, friendsGraph: action.friendsGraph };
  }),

  on(UsersActions.requestAddUserFromUserReports, (state: UsersState, action: { user: UserEntity }) => {
    return { ...state, formState: FormState.SAVING };
  }),
  on(UsersActions.userAddedFromUserReportsSuccess, (state: UsersState, action: { user: UserEntity }) => {
    return { ...state, users: [...state.users, action.user], formState: FormState.SAVED };
  }),
  on(UsersActions.userAddedFromUserReportsFailed, (state: UsersState, action: { error: string }) => {
    return { ...state, formState: FormState.ERROR };
  })
);
