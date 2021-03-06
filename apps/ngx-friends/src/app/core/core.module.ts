import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { throwIfAlreadyLoaded } from '@ngf/shared-ui';
import { CoreMaterialModule } from './material/core-material.module';
import { CoreNgrxModule } from './ngrx/core-ngrx.module';
import { NotificationService } from './_services/notification-service/notification.service';

@NgModule({
  imports: [
    BrowserModule,
    CoreMaterialModule,
    CoreNgrxModule
  ],
  providers: [
    NotificationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
