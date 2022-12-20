import { PartialType } from '@nestjs/swagger';
import { CreateLearningRecommendationDto } from './create-learning-recommendation.dto';

export class UpdateLearningRecommendationDto extends PartialType(CreateLearningRecommendationDto) {}
