export type AttemptConstructorProps = Partial<
  Pick<
    AnswerChoice,
    | 'id'
    | 'question_id'
    | 'learning_style_id'
    | 'answer'
    | 'expert_cf'
    | 'created_at'
    | 'updated_at'
  >
>;

export class AnswerChoice {
  id?: number;
  question_id?: number;
  learning_style_id: string;
  answer: string;
  expert_cf: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(props: AttemptConstructorProps) {
    Object.assign(this, props);
  }
}
