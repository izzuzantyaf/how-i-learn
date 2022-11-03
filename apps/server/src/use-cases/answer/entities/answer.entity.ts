import { isMongoId, isNotEmpty } from 'class-validator';

export type AttemptConstructorProps = Partial<
  Pick<
    Answer,
    | 'id'
    | 'attempt_id'
    | 'answer_choice_id'
    | 'user_cf'
    | 'created_at'
    | 'updated_at'
  >
>;

export class Answer {
  id?: number;
  attempt_id: number;
  answer_choice_id: number;
  user_cf: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor(props: AttemptConstructorProps) {
    const {
      id,
      attempt_id,
      answer_choice_id,
      user_cf,
      created_at,
      updated_at,
    } = props;
    this.id = id;
    this.attempt_id = attempt_id;
    this.answer_choice_id = answer_choice_id;
    this.user_cf = user_cf;
    this.created_at = created_at ? new Date(created_at) : undefined;
    this.updated_at = updated_at ? new Date(updated_at) : undefined;
  }
}
