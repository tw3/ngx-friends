import * as UsersSelectors from './users.selectors';
import { FormState } from '@ngf/shared-ui';
import { AppState } from '../../../core/ngrx/app.state';

describe('Users Selectors', () => {
  let appState: AppState;

  beforeEach(() => {
    appState = {
      users: {
        users: [
          { name: 'Ann', age: 12, weight: 94, friendNames: ['Timmy'] },
          { name: 'Timmy', age: 19, weight: 144, friendNames: ['Ann'] },
          { name: 'Phil', age: 64, weight: 202, friendNames: [] }
        ],
        friendsGraph: {
          links: [
            { source: 'Ann', target: 'Timmy' },
            { source: 'Timmy', target: 'Ann' }
          ],
          nodes: [
            { value: 'Ann' },
            { value: 'Timmy' },
            { value: 'Phil' }
          ]
        },
        formState: FormState.SAVED
      }
    };
  });

  describe('Users Selectors', () => {
    describe('selectUsers', () => {
      it('should return the array of users', () => {
        const results = UsersSelectors.selectUsers(appState);

        expect(results).toEqual([
          { name: 'Ann', age: 12, weight: 94, friendNames: ['Timmy'] },
          { name: 'Timmy', age: 19, weight: 144, friendNames: ['Ann'] },
          { name: 'Phil', age: 64, weight: 202, friendNames: [] }
        ]);
      });
    });

    describe('selectFriendsGraph', () => {
      it('should return the friendsGraph', () => {
        const results = UsersSelectors.selectFriendsGraph(appState);

        expect(results).toEqual({
          links: [
            { source: 'Ann', target: 'Timmy' },
            { source: 'Timmy', target: 'Ann' }
          ],
          nodes: [
            { value: 'Ann' },
            { value: 'Timmy' },
            { value: 'Phil' }
          ]
        });
      });
    });

    describe('selectFormState', () => {
      it('should return the formState', () => {
        const results = UsersSelectors.selectFormState(appState);

        expect(results).toBe(FormState.SAVED);
      });
    });
  });
});
