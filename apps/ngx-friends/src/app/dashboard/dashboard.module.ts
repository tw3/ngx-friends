import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedUiModule } from '@ngf/shared-ui';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    SharedUiModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
