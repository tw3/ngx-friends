import { Injectable } from '@angular/core';
import { UserEntity } from '../../../../../../../libs/shared-ui/src/models/user.model';
import {
  ForceDirectedGraph,
  ForceDirectedGraphLink
} from '../../../../../../../libs/chart-cards-ui/src/models/force-directed-graph.model';
import { Observable, Observer } from 'rxjs';
import { deepCloneObj } from '../../../shared/_util/misc_util';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private users: UserEntity[];
  private friendsGraph: ForceDirectedGraph;

  constructor() {
    this.users = [];
    this.friendsGraph = {
      links: [],
      nodes: []
    };

    // this.initDummyData();
  }

  addUser(newUser: UserEntity): Observable<UserEntity[]> {
    return new Observable<UserEntity[]>((observer: Observer<UserEntity[]>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        const isDuplicate: boolean = this.isDuplicateUser(newUser);
        if (isDuplicate) {
          const message = `There is already a user with the name of '${newUser.name}'`;
          const error: Error = new Error(message);
          observer.error(error);
          return;
        }

        // Add new user to list of users
        this.users = [...this.users, deepCloneObj(newUser)];

        // Add new user's name to the friendNames for his friends
        // This of course assumes that friendships are always bi-directional
        // which is not always the case in reality haha
        newUser.friendNames.forEach((friendName: string) => {
          const friendUser: UserEntity = this.getUserByName(friendName);
          if (friendUser) {
            friendUser.friendNames = [...friendUser.friendNames, newUser.name];
          }
        });

        // Update friendsGraph
        newUser.friendNames.forEach((friendName: string) => {
          const newGraphLink: ForceDirectedGraphLink = {
            source: newUser.name,
            target: friendName
          };
          this.friendsGraph.links = [...this.friendsGraph.links, newGraphLink];
        });
        this.friendsGraph.nodes = [...this.friendsGraph.nodes, {
          value: newUser.name
        }];

        // Trigger next() and complete()
        observer.next(deepCloneObj(this.users));
        observer.complete();
      }, 1000);
    });
  }

  // If this was a real app you'd have the other CRUD operations here
  // i.e. deleteUser(id), editUser(id), etc

  getAllUsers(): Observable<UserEntity[]> {
    return new Observable<UserEntity[]>((observer: Observer<UserEntity[]>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        observer.next(deepCloneObj(this.users));
        observer.complete();
      }, 1000);
    });
  }

  getMatchingUsers(searchText: string, excludeFriendNames?: string[]): Observable<UserEntity[]> {
    return new Observable<UserEntity[]>((observer: Observer<UserEntity[]>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        searchText = searchText.toLowerCase();
        const matchingUsers: UserEntity[] = this.users
          .filter((user: UserEntity) => {
            return !excludeFriendNames.includes(user.name);
          })
          .filter((user: UserEntity) => {
            const lcUserName = user.name.toLowerCase();
            const lcSearchText = searchText.toLowerCase();
            return lcUserName.includes(lcSearchText);
          });
        observer.next(deepCloneObj(matchingUsers));
        observer.complete();
      }, 20);
    });
  }

  getFriendsGraph(): Observable<ForceDirectedGraph> {
    return new Observable<ForceDirectedGraph>((observer: Observer<ForceDirectedGraph>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        observer.next(deepCloneObj(this.friendsGraph));
        observer.complete();
      }, 1000);
    });
  }

  private isDuplicateUser(newUser: UserEntity): boolean {
    return this.users.some((savedUser: UserEntity) => {
      return (savedUser.name === newUser.name);
    });
  }

  private getUserByName(name: string): UserEntity {
    return this.users.find((user: UserEntity): boolean => user.name === name);
  }

  private initDummyData(): void {
    this.users = [
      {
        name: 'abc',
        age: 12,
        weight: 34,
        friendNames: ['def']
      },
      {
        name: 'def',
        age: 89,
        weight: 77,
        friendNames: ['abc']
      }
    ];
    this.friendsGraph = {
      links: [
        {
          source: 'abc',
          target: 'def'
        },
        {
          source: 'def',
          target: 'abc'
        }
      ],
      nodes: [
        {
          value: 'abc'
        },
        {
          value: 'def'
        }
      ]
    };
  }
}
