import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserFormComponent } from '../../../../../shared/_components/user-form/user-form.component';
import { UsersService } from '../../../_services/users.service';
import { NotificationService } from '../../../../../core/_services/notification-service/notification.service';
import { UserEntity } from '../../../../../shared/_models/user.model';
import { FormState } from '../../../../../shared/_models/form-state.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tw3-users-report-user-form',
  templateUrl: './users-report-user-form.component.html',
  styleUrls: ['./users-report-user-form.component.scss']
})
export class UsersReportUserFormComponent implements OnInit, OnDestroy {
  allUsers$: Observable<UserEntity[]>;
  @ViewChild('userForm') private readonly userFormComponent: UserFormComponent;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService
  ) {
    this.allUsers$ = this.usersService.users$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUserSaved(user: UserEntity): void {
    this.userFormComponent.setFormState(FormState.SAVING);
    this.usersService.addUser(user).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: () => this.onUserAddSuccess(user),
      error: (error: Error) => this.onUserAddError(error, user)
    });
  }

  private onUserAddSuccess(user: UserEntity): void {
    this.notificationService.showSuccessToast(`User '${user.name}' added successfully`);

    this.userFormComponent.setFormState(FormState.SAVED);
  }

  private onUserAddError(error: Error, user: UserEntity): void {
    const errorMessage: string = error.message;

    this.notificationService.showErrorToast(`User '${user.name}' add failed: ${errorMessage}`);

    this.userFormComponent.setFormState(FormState.ERROR, errorMessage);
  }
}
