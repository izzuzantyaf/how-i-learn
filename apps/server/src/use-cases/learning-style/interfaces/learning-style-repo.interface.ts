import { LearningStyle } from '../entities/learning-style.entity';

export interface ILearningStyleRepo {
  findAll(): Promise<LearningStyle[]>;
  findById(id: string): Promise<LearningStyle>;
}
