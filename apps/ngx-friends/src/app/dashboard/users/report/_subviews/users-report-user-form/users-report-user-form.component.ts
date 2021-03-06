import { Component, OnInit } from '@angular/core';
import { FormState, UserEntity } from '@ngf/shared-ui';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsersSelectors from '../../../+state/users.selectors';
import * as UsersActions from '../../../+state/users.actions';

@Component({
  selector: 'ngf-users-report-user-form',
  templateUrl: './users-report-user-form.component.html',
  styleUrls: ['./users-report-user-form.component.scss']
})
export class UsersReportUserFormComponent implements OnInit {
  allUsers$: Observable<UserEntity[]>;
  formState$: Observable<FormState>;

  constructor(
    private readonly store: Store
  ) {
    this.allUsers$ = this.store.pipe(select(UsersSelectors.selectUsers));
    this.formState$ = this.store.pipe(select(UsersSelectors.selectFormState));
  }

  ngOnInit(): void {
  }

  onUserSaved(user: UserEntity): void {
    this.store.dispatch(UsersActions.requestAddUserFromUserReports({ user }));
  }
}
