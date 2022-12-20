import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';
import { PrismaService } from './prisma.service';
import { QuestionRepository } from '../../use-cases/question/repo/question.repo';
import { UserRepository } from '../../use-cases/user/repo/user.repo';
import { AttemptRepository } from 'src/use-cases/attempt/repo/attempt.repo';
import { AnswerRepository } from 'src/use-cases/answer/repo/answer.repo';
import { AttemptResultRepository } from 'src/use-cases/attempt-result/repo/attempt-result.repo';
import { LearningRecommendationRepository } from 'src/use-cases/learning-recommendation/repo/learning-recommendation.repo';
import { LearningStyleRepository } from 'src/use-cases/learning-style/repo/learning-style.repo';

@Module({
  providers: [
    PrismaClientService,
    PrismaService,
    UserRepository,
    QuestionRepository,
    AttemptRepository,
    AnswerRepository,
    AttemptResultRepository,
    LearningRecommendationRepository,
    LearningStyleRepository,
  ],
  exports: [
    UserRepository,
    QuestionRepository,
    AttemptRepository,
    AnswerRepository,
    AttemptResultRepository,
    LearningRecommendationRepository,
    LearningStyleRepository,
  ],
})
export class PrismaModule {}
