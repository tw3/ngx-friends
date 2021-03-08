import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { usersReducer } from '../../dashboard/users/+state/users.reducer';
import { UsersEffects } from '../../dashboard/users/+state/users.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(
      {
        users: usersReducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([UsersEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class CoreNgrxModule {
}
