import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { LearningRecommendation } from '../entities/learning-recommendation.entity';
import { ILearningRecommendationRepo } from '../interfaces/learning-recommendation-repo.interface';

@Injectable()
export class LearningRecommendationRepository
  implements ILearningRecommendationRepo
{
  constructor(private prisma: PrismaClientService) {}

  async findByLearningStyleId(
    learning_style_id: string,
  ): Promise<LearningRecommendation[]> {
    const results = await this.prisma.learningRecommendation.findMany({
      select: { learning_style_id: true, name: true },
      where: { learning_style_id },
    });
    return results.map((result) => new LearningRecommendation(result));
  }
}
