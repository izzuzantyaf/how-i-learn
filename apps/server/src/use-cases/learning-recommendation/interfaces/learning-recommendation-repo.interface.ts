import { LearningRecommendation } from '../entities/learning-recommendation.entity';

export interface ILearningRecommendationRepo {
  findByLearningStyleId(
    learning_style_id: string,
  ): Promise<LearningRecommendation[]>;
}
