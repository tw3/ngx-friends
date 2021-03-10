import { NgModule } from '@angular/core';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersReportUserFormComponent } from './_subviews/users-report-user-form/users-report-user-form.component';
import { UsersReportGraphsComponent } from './_subviews/users-report-graphs/users-report-graphs.component';
import { SharedUiModule } from '../../../../../../../libs/shared-ui/src';

@NgModule({
  declarations: [
    UsersReportComponent,
    UsersReportUserFormComponent,
    UsersReportGraphsComponent
  ],
  imports: [
    SharedModule,
    SharedUiModule,
    UsersReportRoutingModule
  ]
})
export class UsersReportModule {
}
