import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersReportGraphsComponent } from './users-report-graphs.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialUsersState } from '../../../+state/users.reducer';
import * as UsersActions from '../../../+state/users.actions';
import { UserEntity } from '@ngf/shared-ui';
import * as UsersSelectors from '../../../+state/users.selectors';

describe('UsersReportGraphsComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<UsersReportGraphsComponent>;
  let comp: UsersReportGraphsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [UsersReportGraphsComponent],
      providers: [
        provideMockStore({ initialState: initialUsersState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportGraphsComponent);
    comp = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initListenForUsersChange() and dispatch fetchUsersFromUserReports', () => {
      const initListenForUsersChangeSpy = spyOn<any>(comp, 'initListenForUsersChange');
      const dispatchSpy = spyOn(store, 'dispatch');

      comp.ngOnInit();

      expect(initListenForUsersChangeSpy).toHaveBeenCalledWith();
      expect(dispatchSpy).toHaveBeenCalledWith(UsersActions.fetchUsersFromUserReports());
    });
  });

  describe('initListenForUsersChange', () => {
    it('should call handleUsersChange() when there is a users change', () => {
      const handleUsersChangeSpy = spyOn<any>(comp, 'handleUsersChange');
      const users: UserEntity[] = [{
        name: 'Jessica', age: 37, weight: 166, friendNames: ['Jordan']
      }];
      UsersSelectors.selectUsers.setResult(users);

      comp['initListenForUsersChange']();

      expect(handleUsersChangeSpy).toHaveBeenCalledWith(users);
    });
  });

  describe('handleUsersChange', () => {
    it('should convert users into results and dispatch fetchFriendsGraphFromUserReports', () => {
      const users: UserEntity[] = [{
        name: 'Jessica', age: 37, weight: 166, friendNames: ['Jordan']
      }];
      const dispatchSpy = spyOn(store, 'dispatch');

      comp['handleUsersChange'](users);

      expect(comp.userAgeResults).toEqual([{ name: 'Jessica', value: 37 }]);
      expect(comp.userWeightResults).toEqual([{ name: 'Jessica', value: 166 }]);
      expect(comp.ageWeightResults).toEqual([{
        name: 'Jessica',
        series: [{
          name: '',
          x: 37,
          y: 166,
          r: 1
        }]
      }]);
      expect(dispatchSpy).toHaveBeenCalledWith(UsersActions.fetchFriendsGraphFromUserReports());
    });
  });

  // https://ngrx.io/guide/store/testing
});
