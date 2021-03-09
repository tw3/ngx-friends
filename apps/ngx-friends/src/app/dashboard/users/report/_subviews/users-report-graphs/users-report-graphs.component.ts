import { Component, OnDestroy, OnInit } from '@angular/core';
import { HorizontalBarChartDataPoint } from '../../../../../shared/chart-cards/horizontal-bar-chart/horizontal-bar-chart-data-point.model';
import { BubbleChartDataPoint } from '../../../../../shared/chart-cards/bubble-chart/bubble-chart-data-point.model';
import { ForceDirectedGraph } from '../../../../../shared/_models/force-directed-graph.model';
import { takeUntil } from 'rxjs/operators';
import { UserEntity } from '../../../../../shared/_models/user.model';
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
    users.forEach((user: UserEntity) => {
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
    });

    // Re-fetch the friendsGraph
    this.store.dispatch(UsersActions.fetchFriendsGraphFromUserReports());
  }

}
