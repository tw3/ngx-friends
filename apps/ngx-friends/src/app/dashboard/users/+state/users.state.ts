import { UserEntity } from '../../../shared/_models/user.model';
import { FormState } from '../../../shared/_models/form-state.enum';
import { ForceDirectedGraph } from '../../../shared/_models/force-directed-graph.model';

export interface UsersState {
  users: UserEntity[];
  friendsGraph: ForceDirectedGraph;
  formState: FormState;
}
