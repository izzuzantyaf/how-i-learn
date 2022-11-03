import { isMongoId, isNotEmpty } from 'class-validator';
import { AnswerChoice } from 'src/use-cases/answer-choice/entities/answer-choice.entity';

export type QuestionConstructorProps = Partial<
  Pick<
    Question,
    'id' | 'question' | 'answer_choices' | 'created_at' | 'updated_at'
  >
>;

export class Question {
  id?: number; // id or general database identifier
  question: string;
  answer_choices: AnswerChoice[];
  readonly created_at?: Date | string;
  readonly updated_at?: Date | string;

  constructor(props: QuestionConstructorProps) {
    const { id, question, answer_choices, created_at, updated_at } = props;
    this.id = id;
    this.question = question;
    this.answer_choices = answer_choices;
    this.created_at = created_at ? new Date(created_at) : undefined;
    this.updated_at = updated_at ? new Date(updated_at) : undefined;
  }
}
