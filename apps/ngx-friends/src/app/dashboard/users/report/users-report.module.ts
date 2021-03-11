import { NgModule } from '@angular/core';
import { ChartCardsUiModule } from '@ngf/chart-cards-ui';
import { SharedUiModule } from '@ngf/shared-ui';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { UsersReportUserFormComponent } from './_subviews/users-report-user-form/users-report-user-form.component';
import { UsersReportGraphsComponent } from './_subviews/users-report-graphs/users-report-graphs.component';

@NgModule({
  declarations: [
    UsersReportComponent,
    UsersReportUserFormComponent,
    UsersReportGraphsComponent
  ],
  imports: [
    SharedUiModule,
    ChartCardsUiModule,
    UsersReportRoutingModule
  ]
})
export class UsersReportModule {
}
