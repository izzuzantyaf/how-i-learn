import { CreateAttemptDto } from '../dto/create-attempt.dto';
import { Attempt } from '../entities/attempt.entity';

export interface IAttemptRepo {
  create(data: CreateAttemptDto): Promise<Attempt>;
  findById(id: number): Promise<Attempt>;
  findByUserId(userId: number): Promise<Attempt[]>;
  deleteById(id: number): Promise<Attempt | null>;
}
