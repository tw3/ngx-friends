import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedUiModule } from '@ngf/shared-ui';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedUiModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
