import { UserEntity } from '@ngf/shared-ui';
import { FormState } from '../../../shared/_models/form-state.enum';
import { ForceDirectedGraph } from '@ngf/chart-cards-ui';

export interface UsersState {
  users: UserEntity[];
  friendsGraph: ForceDirectedGraph;
  formState: FormState;
}
