import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/_models/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserFormComponent } from '../../../shared/_components/user-form/user-form.component';

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

  constructor() {
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
    console.log('UsersReportComponent.onUserSaved()', user);
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
