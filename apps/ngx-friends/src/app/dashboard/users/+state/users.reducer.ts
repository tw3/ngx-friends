import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UsersState } from './users.state';
import { UserEntity } from '../../../shared/_models/user.model';
import { FormState } from '../../../shared/_models/form-state.enum';

export const initialState: UsersState = {
  users: [],
  formState: FormState.READY
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.usersFetchedFromUserReportsSuccess, (state: UsersState, action: { users: UserEntity[] }) => {
    return { ...state, users: action.users };
  }),
  on(UserActions.requestAddUserFromUserReports, (state: UsersState, action: { user: UserEntity }) => {
    return { ...state, formState: FormState.SAVING };
  }),
  on(UserActions.userAddedFromUserReportsSuccess, (state: UsersState, action: { user: UserEntity }) => {
    return { ...state, users: [...state.users, action.user], formState: FormState.SAVED };
  }),
  on(UserActions.userAddedFromUserReportsFailed, (state: UsersState, action: { error: string }) => {
    return { ...state, formState: FormState.ERROR };
  })
);
