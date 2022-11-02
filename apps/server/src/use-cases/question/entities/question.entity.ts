import { isMongoId, isNotEmpty } from 'class-validator';

export type QuestionConstructorProps = Partial<
  Pick<
    Question,
    '_id' | 'id' | 'question' | 'answer_choices' | 'created_at' | 'updated_at'
  >
>;

class AnswerChoice {
  id?: number | string; // id or general database identifier
  _id?: string; // id for MongoDB database
  question_id?: number | string;
  question?: Question;
  learning_style_id: string;
  answer: string;
  expert_cf: number;
  readonly created_at?: Date | string;
  readonly updated_at?: Date | string;
}

export class Question {
  id?: number | string; // id or general database identifier
  _id?: string; // id for MongoDB database
  question: string;
  answer_choices: AnswerChoice[];
  readonly created_at?: Date | string;
  readonly updated_at?: Date | string;

  constructor(props: QuestionConstructorProps) {
    const { _id, id, question, answer_choices, created_at, updated_at } = props;
    if (isMongoId(id)) {
      this._id = id as string;
      this.id = id;
    } else {
      this.id = id;
    }
    if (isNotEmpty(_id)) {
      this._id = _id;
      this.id = _id;
    }
    this.question = question;
    this.answer_choices = answer_choices;
    this.created_at = created_at ? new Date(created_at) : undefined;
    this.updated_at = updated_at ? new Date(updated_at) : undefined;
  }
}
