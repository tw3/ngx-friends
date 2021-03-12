import { ForceDirectedGraph } from '@ngf/chart-cards-ui';
import { FormState, UserEntity } from '@ngf/shared-ui';

export interface UsersState {
  users: UserEntity[];
  friendsGraph: ForceDirectedGraph;
  formState: FormState;
}
