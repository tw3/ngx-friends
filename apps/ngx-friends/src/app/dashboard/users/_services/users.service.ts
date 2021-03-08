import { Injectable } from '@angular/core';
import { ForceDirectedGraph } from '../../../shared/_models/force-directed-graph.model';
import { Observable } from 'rxjs';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private readonly usersApiService: UsersApiService
  ) {
  }

  getFriendsGraph(): Observable<ForceDirectedGraph> {
    return this.usersApiService.getFriendsGraph();
  }

}
