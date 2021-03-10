import { NgModule } from '@angular/core';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { UsersReportUserFormComponent } from './_subviews/users-report-user-form/users-report-user-form.component';
import { UsersReportGraphsComponent } from './_subviews/users-report-graphs/users-report-graphs.component';
import { SharedUiModule } from '../../../../../../../libs/shared-ui/src';
import { ChartCardsUiModule } from '../../../../../../../libs/chart-cards-ui/src';

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
