import { createAction, props } from '@ngrx/store';
import { UserEntity } from '../../../shared/_models/user.model';

export const requestAddUserFromUserReports = createAction(
  '[User Reports] Request Add User',
  props<{ user: UserEntity }>()
);

export const userAddedFromUserReportsSuccess = createAction(
  '[User Reports] User Added Successfully',
  props<{ user: UserEntity }>()
);

export const userAddedFromUserReportsFailed = createAction(
  '[User Reports] User Add Failed',
  props<{ error: string }>()
);

export const fetchUsersFromUserReports = createAction(
  '[User Reports] Fetch Users'
);

export const usersFetchedFromUserReportsSuccess = createAction(
  '[User Reports] Users Fetched Successfully',
  props<{ users: UserEntity[] }>()
);
