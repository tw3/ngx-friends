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
  userAgeResults: HorizontalBarChartDataPoint[];
  userWeightResults: HorizontalBarChartDataPoint[];
  ageWeightResults: BubbleChartDataPoint[];
  friendsGraph: ForceDirectedGraph = {
    links: [],
    nodes: []
  };

  private allUsers$: Observable<UserEntity[]>;
  private friendsGraph$: Observable<ForceDirectedGraph>;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly store: Store
  ) {
    this.allUsers$ = this.store.pipe(select(UsersSelectors.selectUsers));
    this.friendsGraph$ = this.store.pipe(select(UsersSelectors.selectFriendsGraph));
  }

  ngOnInit(): void {
    this.initListenForUsersChange();
    this.initListenForFriendsGraphChange();

    this.store.dispatch(UsersActions.fetchUsersFromUserReports());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get hasUserAgeResults(): boolean {
    return !!this.userAgeResults && this.userAgeResults.length > 0;
  }

  get hasUserWeightResults(): boolean {
    return !!this.userWeightResults && this.userWeightResults.length > 0;
  }

  get hasAgeWeightResults(): boolean {
    return !!this.ageWeightResults && this.ageWeightResults.length > 0;
  }

  get hasFriendsGraph(): boolean {
    return !!this.friendsGraph && !!this.friendsGraph.nodes && this.friendsGraph.nodes.length > 0;
  }

  private initListenForUsersChange(): void {
    this.allUsers$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.handleUsersChange.bind(this)
    });
  }

  private initListenForFriendsGraphChange(): void {
    this.friendsGraph$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.handleGetFriendsGraphSuccess.bind(this)
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

  private handleGetFriendsGraphSuccess(friendsGraph: ForceDirectedGraph): void {
    this.friendsGraph = friendsGraph;
  }

}
