import { Injectable } from '@angular/core';
import { User } from '../../../shared/_models/user.model';
import { ForceDirectedGraph, ForceDirectedGraphLink } from '../../../shared/_models/force-directed-graph.model';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users$: Observable<User[]>;

  // TODO: Remove once NgRX is integrated
  private readonly users: User[];
  private readonly friendsGraph: ForceDirectedGraph;

  private usersSubject: Subject<User[]> = new Subject<User[]>();

  constructor() {
    // this.users = [];
    // this.friendsGraph = {
    //   links: [],
    //   nodes: []
    // };

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
          source: {
            name: 'abc'
          },
          target: 'def'
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

    this.users$ = this.usersSubject.asObservable();
  }

  addUser(newUser: User): Observable<User> {
    return new Observable<User>((observer: Observer<User>) => {
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
        this.users.push(newUser);

        // Add new user's name to the friendNames for his friends
        // This of course assumes that friendships are always bi-directional
        // which is not always the case in reality haha
        newUser.friendNames.forEach((friendName: string) => {
          const friendUser: User = this.getUserByName(friendName);
          if (friendUser) {
            friendUser.friendNames.push(newUser.name);
          }
        });

        // Update friendsGraph
        newUser.friendNames.forEach((friendName: string) => {
          const newGraphLink: ForceDirectedGraphLink = {
            source: {
              name: newUser.name
            },
            target: friendName
          };
          this.friendsGraph.links.push(newGraphLink);
        });
        this.friendsGraph.nodes.push({
          value: newUser.name
        });

        // Trigger next() and complete()
        observer.next(newUser);
        observer.complete();

        this.usersSubject.next(this.users);
      }, 1000);
    });
  }

  // If this was a real app you'd have the other CRUD operations here
  // i.e. deleteUser(id), editUser(id), etc

  getUsers(): Observable<User[]> {
    return new Observable<User[]>((observer: Observer<User[]>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        observer.next(this.users);
        observer.complete();

        this.usersSubject.next(this.users);
      }, 1000);
    });
  }

  getMatchingUsers(searchText: string, excludeFriendNames?: string[]): Observable<User[]> {
    return new Observable<User[]>((observer: Observer<User[]>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        searchText = searchText.toLowerCase();
        const matchingUsers: User[] = this.users
          .filter((user: User) => {
            return !excludeFriendNames.includes(user.name);
          })
          .filter((user: User) => {
            const lcUserName = user.name.toLowerCase();
            const lcSearchText = searchText.toLowerCase();
            return lcUserName.includes(lcSearchText);
          });
        observer.next(matchingUsers);
        observer.complete();
      }, 20);
    });
  }

  getFriendsGraph(): Observable<ForceDirectedGraph> {
    return new Observable<ForceDirectedGraph>((observer: Observer<ForceDirectedGraph>) => {
      // This is where you'd normally have an httpClient.get() call, this timeout simulates it
      window.setTimeout(() => {
        observer.next(this.friendsGraph);
        observer.complete();
      }, 1000);
    });
  }

  private isDuplicateUser(newUser: User): boolean {
    return this.users.some((savedUser: User) => {
      return (savedUser.name === newUser.name);
    });
  }

  private getUserByName(name: string): User {
    return this.users.find((user: User): boolean => user.name === name);
  }
}
