import { Component, OnDestroy, OnInit } from '@angular/core';
import { HorizontalBarChartDataPoint } from '../../../../../shared/chart-cards/horizontal-bar-chart/horizontal-bar-chart-data-point.model';
import { BubbleChartDataPoint } from '../../../../../shared/chart-cards/bubble-chart/bubble-chart-data-point.model';
import { ForceDirectedGraph } from '../../../../../shared/_models/force-directed-graph.model';
import { UsersService } from '../../../_services/users.service';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../../shared/_models/user.model';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_services/notification-service/notification.service';

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

  private allFriendNames: string[];

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.initListenForUsersChanges();

    this.usersService.getUsers().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      error: this.handleGetUsersError.bind(this)
    });
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
    this.usersService.users$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.handleUsersChange.bind(this)
    });
  }

  private handleUsersChange(users: User[]): void {
    // Update allFriendNames
    this.allFriendNames = users.map((user: User) => user.name);

    // Convert users into results
    this.userAgeResults = [];
    this.userWeightResults = [];
    this.ageWeightResults = [];
    users.forEach((user: User) => {
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
