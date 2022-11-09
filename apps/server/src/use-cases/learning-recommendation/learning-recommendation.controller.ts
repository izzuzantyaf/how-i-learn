import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearningRecommendationService } from './learning-recommendation.service';
import { CreateLearningRecommendationDto } from './dto/create-learning-recommendation.dto';
import { UpdateLearningRecommendationDto } from './dto/update-learning-recommendation.dto';

@Controller('api/learning-recommendations')
export class LearningRecommendationController {
  constructor(
    private readonly learningRecommendationService: LearningRecommendationService,
  ) {}

  @Post()
  create(
    @Body() createLearningRecommendationDto: CreateLearningRecommendationDto,
  ) {
    return this.learningRecommendationService.create(
      createLearningRecommendationDto,
    );
  }

  @Get()
  findAll() {
    return this.learningRecommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningRecommendationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLearningRecommendationDto: UpdateLearningRecommendationDto,
  ) {
    return this.learningRecommendationService.update(
      +id,
      updateLearningRecommendationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningRecommendationService.remove(+id);
  }
}
