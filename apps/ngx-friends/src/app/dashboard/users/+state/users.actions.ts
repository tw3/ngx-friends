import { createAction, props } from '@ngrx/store';
import { UserEntity } from '@ngf/shared-ui';
import { ForceDirectedGraph } from '@ngf/chart-cards-ui';

// Fetch User ----------------------------------------

export const fetchUsersFromUserReports = createAction(
  '[User Reports] Fetch Users'
);

export const usersFetchedFromUserReportsSuccess = createAction(
  '[User Reports] Users Fetched Successfully',
  props<{ users: UserEntity[] }>()
);

// TODO Handle usersFetchedFromUserReportsFailed

// Fetch Friends Graph ----------------------------------------

export const fetchFriendsGraphFromUserReports = createAction(
  '[User Reports] Fetch Friends Graph'
);

export const friendsGraphFetchedFromUserReportsSuccess = createAction(
  '[User Reports] Friends Graph Fetched Successfully',
  props<{ friendsGraph: ForceDirectedGraph }>()
);

// TODO Handle friendsGraphFetchedFromUserReportsFailed

// Add User ----------------------------------------

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
