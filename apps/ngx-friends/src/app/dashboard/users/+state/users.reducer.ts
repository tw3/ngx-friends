import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UsersState } from './users.state';
import { UserEntity } from '../../../shared/_models/user.model';

export const initialState: UsersState = {
  users: [],
  isAddingUser: false
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.usersFetchedFromUserReportsSuccess, (state: UsersState, action: { users: UserEntity[] }) => {
    return { ...state, users: action.users };
  }),
  on(UserActions.requestAddUserFromUserReports, (state: UsersState, action: { user: UserEntity }) => {
    return { ...state, isAddingUser: true };
  }),
  on(UserActions.userAddedFromUserReportsSuccess, (state: UsersState, action: { user: UserEntity }) => {
    return { ...state, users: [...state.users, action.user], isAddingUser: false };
  }),
  on(UserActions.userAddedFromUserReportsFailed, (state: UsersState, action: { error: string }) => {
    return { ...state, isAddingUser: false };
  })
);
