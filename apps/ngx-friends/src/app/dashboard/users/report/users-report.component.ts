import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/_models/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserFormComponent } from '../../../shared/_components/user-form/user-form.component';
import { FormState } from '../../../shared/_models/form-state.enum';
import { NotificationService } from '../../../core/_services/notification-service/notification.service';

@Component({
  selector: 'tw3-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.scss']
})
export class UsersReportComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly friendAutocompleteOptions$: Observable<string[]>;

  @ViewChild('userForm') private readonly userFormComponent: UserFormComponent;

  private readonly friendAutocompleteOptionsSubject: Subject<string[]> = new Subject<string[]>();
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
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
    // Simulate wait for now
    setTimeout(() => {
      this.userFormComponent.setFormState(FormState.SAVED);
      this.notificationService.showSuccessToast('User saved successfully');
    }, 2000);
  }

  private initListenForAutocompleteTyping(): void {
    this.userFormComponent.friendNameInputValueChange$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.onFriendAutocompleteTyping.bind(this));
  }

  private onFriendAutocompleteTyping(searchText: string): void {
    return this.friendAutocompleteOptionsSubject.next([searchText, 'Paul']);
  }

}
