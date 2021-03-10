import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedUiModule } from '../../../../../../libs/shared-ui/src';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedUiModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
