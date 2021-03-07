import { NgModule } from '@angular/core';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersReportUserFormComponent } from './_subviews/users-report-user-form/users-report-user-form.component';

@NgModule({
  declarations: [
    UsersReportComponent,
    UsersReportUserFormComponent
  ],
  imports: [
    SharedModule,
    UsersReportRoutingModule
  ]
})
export class UsersReportModule {
}
