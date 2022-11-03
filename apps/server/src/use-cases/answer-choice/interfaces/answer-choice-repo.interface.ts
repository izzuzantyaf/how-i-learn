import { AnswerChoice } from '../entities/answer-choice.entity';

export interface IAnswerChoiceRepo {
  findMany(): Promise<AnswerChoice[]>;
}
