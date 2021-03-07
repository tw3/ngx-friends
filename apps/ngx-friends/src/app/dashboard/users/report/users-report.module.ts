import { NgModule } from '@angular/core';

import { UsersReportRoutingModule } from './users-report-routing.module';
import { UsersReportComponent } from './users-report.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [UsersReportComponent],
  imports: [
    SharedModule,
    UsersReportRoutingModule
  ]
})
export class UsersReportModule {
}
