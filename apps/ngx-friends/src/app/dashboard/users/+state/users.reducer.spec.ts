import * as UsersActions from './users.actions';
import { initialUsersState, usersReducer } from './users.reducer';
import { FormState, UserEntity } from '@ngf/shared-ui';
import { UsersState } from './users.state';
import { ForceDirectedGraph } from '@ngf/chart-cards-ui';

describe('Users Reducer', () => {
  beforeEach(() => {
  });

  describe('valid actions', () => {
    describe('usersFetchedFromUserReportsSuccess', () => {
      it('should set users in UsersState', () => {
        const users: UserEntity[] = [{}, {}] as UserEntity[];
        const action = UsersActions.usersFetchedFromUserReportsSuccess({ users });

        const newState: UsersState = usersReducer(initialUsersState, action);

        expect(newState).not.toBe(initialUsersState);
        expect(newState.users).toBe(users);
      });
    });

    describe('friendsGraphFetchedFromUserReportsSuccess', () => {
      it('should set friendsGraph in UsersState', () => {
        const friendsGraph: ForceDirectedGraph = {} as ForceDirectedGraph;
        const action = UsersActions.friendsGraphFetchedFromUserReportsSuccess({ friendsGraph });

        const newState: UsersState = usersReducer(initialUsersState, action);

        expect(newState).not.toBe(initialUsersState);
        expect(newState.friendsGraph).toBe(friendsGraph);
      });
    });

    describe('requestAddUserFromUserReports', () => {
      it('should set formState to SAVING in UsersState', () => {
        const user: UserEntity = {} as UserEntity;
        const action = UsersActions.requestAddUserFromUserReports({ user });

        const newState: UsersState = usersReducer(initialUsersState, action);

        expect(newState).not.toBe(initialUsersState);
        expect(newState.formState).toBe(FormState.SAVING);
      });
    });

    describe('userAddedFromUserReportsSuccess', () => {
      const user1: UserEntity = {
        name: 'Sam', age: 21, weight: 140, friendNames: []
      };

      it('should add first user and set formState to SAVED in UsersState', () => {
        const action1 = UsersActions.userAddedFromUserReportsSuccess({ user: user1 });

        const newState1: UsersState = usersReducer(initialUsersState, action1);

        expect(newState1).not.toBe(initialUsersState);
        expect(newState1.users).toEqual([user1]);
        expect(newState1.formState).toBe(FormState.SAVED);
      });

      it('should add second user in UsersState', () => {
        const action1 = UsersActions.userAddedFromUserReportsSuccess({ user: user1 });
        const newState1: UsersState = usersReducer(initialUsersState, action1);

        const user2: UserEntity = {
          name: 'Jake', age: 61, weight: 150, friendNames: []
        };
        const action2 = UsersActions.userAddedFromUserReportsSuccess({ user: user2 });

        const newState2: UsersState = usersReducer(newState1, action2);

        expect(newState2).not.toBe(newState1);
        expect(newState2.users).toEqual([user1, user2]);
        expect(newState1.formState).toBe(FormState.SAVED);
      });
    });

    describe('userAddedFromUserReportsFailed', () => {
      it('should set formState to ERROR in UsersState', function() {
        const error = 'Too many cooks in the kitchen';
        const action = UsersActions.userAddedFromUserReportsFailed({ error });

        const newState: UsersState = usersReducer(initialUsersState, action);

        expect(newState).not.toBe(initialUsersState);
        expect(newState.formState).toBe(FormState.ERROR);
      });
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = usersReducer(initialUsersState, action);

      expect(result).toBe(initialUsersState);
    });
  });
});
