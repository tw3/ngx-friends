import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreMaterialModule } from './material/core-material.module';
import { throwIfAlreadyLoaded } from '../shared/_util/throw-if-already-loaded';

@NgModule({
  imports: [
    BrowserModule,
    CoreMaterialModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
