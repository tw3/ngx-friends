import { Injectable } from '@angular/core';
import { UserEntity } from '../../../shared/_models/user.model';
import { ForceDirectedGraph } from '../../../shared/_models/force-directed-graph.model';
import { Observable, Subject } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users$: Observable<UserEntity[]>;

  private usersSubject: Subject<UserEntity[]> = new Subject<UserEntity[]>();

  constructor(
    private readonly usersApiService: UsersApiService
  ) {
    this.users$ = this.usersSubject.asObservable();
  }

  addUser(newUser: UserEntity): Observable<UserEntity[]> {
    return this.usersApiService.addUser(newUser).pipe(
      tap((users: UserEntity[]) => this.usersSubject.next(users))
    );
  }

  getUsers(): Observable<UserEntity[]> {
    return this.usersApiService.getUsers().pipe(
      tap((users: UserEntity[]) => this.usersSubject.next(users))
    );
  }

  getMatchingUsers(searchText: string, excludeFriendNames?: string[]): Observable<UserEntity[]> {
    return this.usersApiService.getMatchingUsers(searchText, excludeFriendNames);
  }

  getFriendsGraph(): Observable<ForceDirectedGraph> {
    return this.usersApiService.getFriendsGraph();
  }

}
