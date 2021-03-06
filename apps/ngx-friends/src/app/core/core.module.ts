import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreMaterialModule } from './material/core-material.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreMaterialModule
  ]
})
export class CoreModule {
}
