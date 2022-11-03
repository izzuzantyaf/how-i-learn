import { isMongoId, isNotEmpty } from 'class-validator';
import { User } from 'src/use-cases/user/entities/user.entity';

export type AttemptConstructorProps = Partial<
  Pick<Attempt, 'id' | 'user_id' | 'user' | 'created_at' | 'updated_at'>
>;
export class Attempt {
  id?: number;
  user_id?: number;
  user?: User;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor(props: AttemptConstructorProps) {
    const { id, user_id, user, created_at, updated_at } = props;
    this.id = id;
    this.user_id = user_id;
    this.user = user;
    this.created_at = created_at ? new Date(created_at) : undefined;
    this.updated_at = updated_at ? new Date(updated_at) : undefined;
  }
}
