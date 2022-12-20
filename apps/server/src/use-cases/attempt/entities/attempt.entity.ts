import { AttemptResult } from 'src/use-cases/attempt-result/entities/attempt-result.entity';
import { User } from 'src/use-cases/user/entities/user.entity';

export type AttemptConstructorProps = Partial<
  Pick<Attempt, 'id' | 'user_id' | 'user' | 'created_at' | 'updated_at'>
>;
export class Attempt {
  id?: number;
  user_id?: number;
  user?: User;
  attempt_results?: AttemptResult[];
  created_at?: Date;
  updated_at?: Date;

  constructor(props: AttemptConstructorProps) {
    Object.assign(this, props);
  }
}
