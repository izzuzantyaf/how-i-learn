import { Injectable } from '@nestjs/common';
import { CreateLearningRecommendationDto } from './dto/create-learning-recommendation.dto';
import { UpdateLearningRecommendationDto } from './dto/update-learning-recommendation.dto';

@Injectable()
export class LearningRecommendationService {
  create(createLearningRecommendationDto: CreateLearningRecommendationDto) {
    return 'This action adds a new learningRecommendation';
  }

  findAll() {
    return `This action returns all learningRecommendation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningRecommendation`;
  }

  update(id: number, updateLearningRecommendationDto: UpdateLearningRecommendationDto) {
    return `This action updates a #${id} learningRecommendation`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningRecommendation`;
  }
}
