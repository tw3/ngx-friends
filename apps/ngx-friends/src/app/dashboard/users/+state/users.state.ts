import { UserEntity } from '../../../../../../../libs/shared-ui/src/models/user.model';
import { FormState } from '../../../shared/_models/form-state.enum';
import { ForceDirectedGraph } from '../../../../../../../libs/chart-cards-ui/src/models/force-directed-graph.model';

export interface UsersState {
  users: UserEntity[];
  friendsGraph: ForceDirectedGraph;
  formState: FormState;
}
