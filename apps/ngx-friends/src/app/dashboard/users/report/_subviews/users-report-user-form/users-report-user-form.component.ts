import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserFormComponent } from '../../../../../shared/_components/user-form/user-form.component';
import { UsersService } from '../../../_services/users.service';
import { NotificationService } from '../../../../../core/_services/notification-service/notification.service';
import { User } from '../../../../../shared/_models/user.model';
import { FormState } from '../../../../../shared/_models/form-state.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tw3-users-report-user-form',
  templateUrl: './users-report-user-form.component.html',
  styleUrls: ['./users-report-user-form.component.scss']
})
export class UsersReportUserFormComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly friendAutocompleteOptions$: Observable<string[]>;

  @ViewChild('userForm') private readonly userFormComponent: UserFormComponent;

  private readonly friendAutocompleteOptionsSubject: Subject<string[]> = new Subject<string[]>();
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService
  ) {
    this.friendAutocompleteOptions$ = this.friendAutocompleteOptionsSubject.asObservable();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initListenForAutocompleteTyping();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUserSaved(user: User): void {
    this.userFormComponent.setFormState(FormState.SAVING);
    this.usersService.addUser(user).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: () => this.onUserAddSuccess(user),
      error: (error: Error) => this.onUserAddError(error, user)
    });
  }

  private initListenForAutocompleteTyping(): void {
    this.userFormComponent.friendNameInputValueChange$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: this.onFriendAutocompleteTyping.bind(this)
    });
  }

  private onFriendAutocompleteTyping(searchText: string): void {
    return this.friendAutocompleteOptionsSubject.next([searchText, 'Paul']);
  }

  private onUserAddSuccess(user: User): void {
    this.notificationService.showSuccessToast(`User '${user.name}' added successfully`);

    this.userFormComponent.setFormState(FormState.SAVED);
  }

  private onUserAddError(error: Error, user: User): void {
    const errorMessage: string = error.message;

    this.notificationService.showErrorToast(`User '${user.name}' add failed: ${errorMessage}`);

    this.userFormComponent.setFormState(FormState.ERROR, errorMessage);
  }
}
