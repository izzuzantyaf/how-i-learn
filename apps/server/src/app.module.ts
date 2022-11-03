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

@Module({
  imports: [UserModule, AuthModule, AttemptModule, QuestionModule, AnswerChoiceModule, AnswerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
