import { UserEntity } from '../../../shared/_models/user.model';

export interface UsersState {
  users: UserEntity[];
  isAddingUser: boolean;
}
