import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedUiModule } from '../../../../../../libs/shared-ui/src';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule,
    SharedUiModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
