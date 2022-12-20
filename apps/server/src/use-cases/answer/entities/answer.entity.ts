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
  created_at?: Date;
  updated_at?: Date;

  constructor(props: AttemptConstructorProps) {
    Object.assign(this, props);
  }
}
