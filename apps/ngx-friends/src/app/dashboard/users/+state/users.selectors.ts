import { createSelector } from '@ngrx/store';
import { UsersState } from './users.state';
import { AppState } from '../../../core/ngrx/app.state';

export const selectFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectFeature,
  (users: UsersState) => users.users
);

export const selectFriendsGraph = createSelector(
  selectFeature,
  (users: UsersState) => users.friendsGraph
);

export const selectFormState = createSelector(
  selectFeature,
  (users: UsersState) => users.formState
);
