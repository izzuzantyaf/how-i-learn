import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Answer } from '../entities/answer.entity';

export interface IAnswerRepo {
  createMany(data: CreateAnswerDto[]): Promise<Answer[] | number>;
  deleteByAttemptId(attempt_id: number): Promise<number>;
}
