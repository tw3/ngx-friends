import { UserEntity } from '../../../shared/_models/user.model';
import { FormState } from '../../../shared/_models/form-state.enum';

export interface UsersState {
  users: UserEntity[];
  formState: FormState
}
