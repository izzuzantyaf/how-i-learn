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

@Module({
  imports: [UserModule, AuthModule, AttemptModule, QuestionModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
