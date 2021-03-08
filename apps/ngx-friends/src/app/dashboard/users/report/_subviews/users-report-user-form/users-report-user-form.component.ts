import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserEntity } from '../../../../../shared/_models/user.model';
import { FormState } from '../../../../../shared/_models/form-state.enum';
import { select, Store } from '@ngrx/store';
import { selectIsAddingUser, selectUsers } from '../../../+state/users.selectors';
import {
  requestAddUserFromUserReports,
  userAddedFromUserReportsFailed,
  userAddedFromUserReportsSuccess
} from '../../../+state/users.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tw3-users-report-user-form',
  templateUrl: './users-report-user-form.component.html',
  styleUrls: ['./users-report-user-form.component.scss']
})
export class UsersReportUserFormComponent implements OnInit, OnDestroy {
  allUsers$: Observable<UserEntity[]>;
  formState: FormState = FormState.READY;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions
  ) {
    this.allUsers$ = this.store.pipe(select(selectUsers));
    this.initListenForAddUserSavingState();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUserSaved(user: UserEntity): void {
    this.store.dispatch(requestAddUserFromUserReports({ user }));
  }

  private initListenForAddUserSavingState(): void {
    this.store.pipe(select(selectIsAddingUser)).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.formState = FormState.SAVING;
      }
    });

    this.actions$.pipe(
      ofType(userAddedFromUserReportsSuccess),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((action: { user: UserEntity }) => {
      this.formState = FormState.SAVED;
    });

    this.actions$.pipe(
      ofType(userAddedFromUserReportsFailed),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((action: { error: string }) => {
      this.formState = FormState.ERROR;
    });
  }
}
