import { Component, OnDestroy, OnInit } from '@angular/core';
import { HorizontalBarChartDataPoint } from '../../../../../shared/chart-cards/horizontal-bar-chart/horizontal-bar-chart-data-point.model';
import { BubbleChartDataPoint } from '../../../../../shared/chart-cards/bubble-chart/bubble-chart-data-point.model';
import { ForceDirectedGraph } from '../../../../../shared/_models/force-directed-graph.model';
import { UsersService } from '../../../_services/users.service';
import { takeUntil } from 'rxjs/operators';
import { UserEntity } from '../../../../../shared/_models/user.model';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_services/notification-service/notification.service';
import { select, Store } from '@ngrx/store';
import { fetchUsersFromUserReports } from '../../../+state/users.actions';
import { selectUsers } from '../../../+state/users.selectors';

@Component({
  selector: 'tw3-users-report-graphs',
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

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService
  ) {
    this.allUsers$ = this.store.pipe(select(selectUsers));
  }

  ngOnInit(): void {
    this.initListenForUsersChanges();

    this.store.dispatch(fetchUsersFromUserReports());
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

  private initListenForUsersChanges(): void {
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

    // Get the friendGraph
    this.usersService.getFriendsGraph().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.handleGetFriendsGraphSuccess.bind(this),
      error: this.handleGetFriendsGraphError.bind(this)
    });
  }

  private handleGetUsersError(error: Error): void {
    this.notificationService.showErrorToast(error.message);
  }

  private handleGetFriendsGraphSuccess(friendsGraph: ForceDirectedGraph): void {
    this.friendsGraph = friendsGraph;
  }

  private handleGetFriendsGraphError(error: Error): void {
    this.notificationService.showErrorToast(error.message);
  }

}
