import { Question } from '../entities/question.entity';

export interface IQuestionRepo {
  findAll(): Promise<Question[]>;
}
