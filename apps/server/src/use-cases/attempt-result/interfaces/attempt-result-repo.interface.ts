import { CreateAttemptResultDto } from '../dto/create-attempt-result.dto';
import { AttemptResult } from '../entities/attempt-result.entity';

export interface IAttemptResultRepo {
  createMany(data: CreateAttemptResultDto[]): Promise<AttemptResult[] | number>;
  findMany(): Promise<AttemptResult[]>;
  findByAttemptId(attempt_id: number): Promise<AttemptResult[]>;
  deleteByAttemptId(attempt_id: number): Promise<number>;
}
