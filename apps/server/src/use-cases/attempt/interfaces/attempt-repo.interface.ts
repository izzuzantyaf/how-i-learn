import { LearningRecommendation } from 'src/use-cases/learning-recommendation/entities/learning-recommendation.entity';
import { CreateAttemptDto } from '../dto/create-attempt.dto';
import { Attempt } from '../entities/attempt.entity';

export interface IAttemptRepo {
  create(data: CreateAttemptDto): Promise<Attempt>;
  findById(id: number): Promise<Attempt>;
  findByUserId(userId: number): Promise<Attempt[]>;
  findWithBestLearningTypeAndRecommendation(id: number): Promise<{
    id: number;
    bestLearningType: string;
    learningRecommendations: LearningRecommendation[];
  }>;
  deleteById(id: number): Promise<Attempt | null>;
}
