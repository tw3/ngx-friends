import { Component, OnDestroy, OnInit } from '@angular/core';
import { BubbleChartDataPoint, ForceDirectedGraph, HorizontalBarChartDataPoint } from '@ngf/chart-cards-ui';
import { takeUntil } from 'rxjs/operators';
import { UserEntity } from '@ngf/shared-ui';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as UsersActions from '../../../+state/users.actions';
import * as UsersSelectors from '../../../+state/users.selectors';

@Component({
  selector: 'ngf-users-report-graphs',
  templateUrl: './users-report-graphs.component.html',
  styleUrls: ['./users-report-graphs.component.scss']
})
export class UsersReportGraphsComponent implements OnInit, OnDestroy {
  friendsGraph$: Observable<ForceDirectedGraph>;
  userAgeResults: HorizontalBarChartDataPoint[];
  userWeightResults: HorizontalBarChartDataPoint[];
  ageWeightResults: BubbleChartDataPoint[];

  private allUsers$: Observable<UserEntity[]>;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly store: Store
  ) {
    this.allUsers$ = this.store.pipe(select(UsersSelectors.selectUsers));
    this.friendsGraph$ = this.store.pipe(select(UsersSelectors.selectFriendsGraph));
  }

  ngOnInit(): void {
    this.initListenForUsersChange();

    this.store.dispatch(UsersActions.fetchUsersFromUserReports());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initListenForUsersChange(): void {
    this.allUsers$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.handleUsersChange.bind(this)
    });
  }

  private handleUsersChange(users: UserEntity[]): void {
    // Convert users into results
    this.userAgeResults = [];
    this.userWeightResults = [];
    this.ageWeightResults = [];
    for (const user of users) {
      this.userAgeResults.push({
        name: user.name,
        value: user.age
      });
      this.userWeightResults.push({
        name: user.name,
        value: user.weight
      });
      this.ageWeightResults.push({
        name: user.name,
        series: [
          {
            name: '',
            x: user.age,
            y: user.weight,
            r: user.friendNames.length
          }
        ]
      });
    }

    // Re-fetch the friendsGraph
    this.store.dispatch(UsersActions.fetchFriendsGraphFromUserReports());
  }

}
