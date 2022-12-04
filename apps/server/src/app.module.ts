import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './use-cases/user/user.module';
import { AuthModule } from './use-cases/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AttemptModule } from './use-cases/attempt/attempt.module';
import { QuestionModule } from './use-cases/question/question.module';
import { AnswerChoiceModule } from './use-cases/answer-choice/answer-choice.module';
import { AnswerModule } from './use-cases/answer/answer.module';
import { AttemptResultModule } from './use-cases/attempt-result/attempt-result.module';
import { LearningRecommendationModule } from './use-cases/learning-recommendation/learning-recommendation.module';
import { LearningStyleModule } from './use-cases/learning-style/learning-style.module';
// import { AwsModule } from './lib/aws/aws.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AttemptModule,
    QuestionModule,
    AnswerChoiceModule,
    AnswerModule,
    AttemptResultModule,
    LearningRecommendationModule,
    LearningStyleModule /*AwsModule*/,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
