import { Module } from '@nestjs/common';
import { LearningRecommendationService } from './learning-recommendation.service';
import { LearningRecommendationController } from './learning-recommendation.controller';

@Module({
  controllers: [LearningRecommendationController],
  providers: [LearningRecommendationService]
})
export class LearningRecommendationModule {}
