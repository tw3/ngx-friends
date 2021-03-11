import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoContentComponent } from '@ngf/shared-ui';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NoContentComponent
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
