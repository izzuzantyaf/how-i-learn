import { isMongoId, isNotEmpty } from 'class-validator';

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
  id?: number; // id or general database identifier
  question_id?: number;
  learning_style_id: string;
  answer: string;
  expert_cf: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor(props: AttemptConstructorProps) {
    const {
      id,
      question_id,
      learning_style_id,
      answer,
      expert_cf,
      created_at,
      updated_at,
    } = props;
    this.id = id;
    this.question_id = question_id;
    this.learning_style_id = learning_style_id;
    this.answer = answer;
    this.expert_cf = expert_cf;
    this.created_at = created_at ? new Date(created_at) : undefined;
    this.updated_at = updated_at ? new Date(updated_at) : undefined;
  }
}
