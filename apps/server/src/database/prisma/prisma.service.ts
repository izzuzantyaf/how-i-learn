import { Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/use-cases/answer/repo/answer.repo';
import { AttemptResultRepository } from 'src/use-cases/attempt-result/repo/attempt-result.repo';
import { AttemptRepository } from 'src/use-cases/attempt/repo/attempt.repo';
import { LearningRecommendationRepository } from 'src/use-cases/learning-recommendation/repo/learning-recommendation.repo';
import { QuestionRepository } from '../../use-cases/question/repo/question.repo';
import { UserRepository } from '../../use-cases/user/repo/user.repo';
import { LearningStyleRepository } from '../../use-cases/learning-style/repo/learning-style.repo';

@Injectable()
export class PrismaService {
  constructor(
    public user: UserRepository,
    public question: QuestionRepository,
    public attempt: AttemptRepository,
    public answer: AnswerRepository,
    public attemptResult: AttemptResultRepository,
    public learningRecommendation: LearningRecommendationRepository,
    public learningStyle: LearningStyleRepository,
  ) {}
}
