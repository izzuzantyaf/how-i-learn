import { Test, TestingModule } from '@nestjs/testing';
import { LearningRecommendationController } from './learning-recommendation.controller';
import { LearningRecommendationService } from './learning-recommendation.service';

describe('LearningRecommendationController', () => {
  let controller: LearningRecommendationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningRecommendationController],
      providers: [LearningRecommendationService],
    }).compile();

    controller = module.get<LearningRecommendationController>(LearningRecommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
