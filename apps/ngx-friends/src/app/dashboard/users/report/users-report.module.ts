import { NgModule } from '@angular/core';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    UsersReportComponent,
    UserFormComponent
  ],
  imports: [
    SharedModule,
    UsersReportRoutingModule
  ]
})
export class UsersReportModule {
}
