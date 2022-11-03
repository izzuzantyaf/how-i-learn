import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';
import { PrismaService } from './prisma.service';
import { QuestionRepository } from '../../use-cases/question/repo/question.repo';
import { UserRepository } from '../../use-cases/user/repo/user.repo';
import { AttemptRepository } from 'src/use-cases/attempt/repo/attempt.repo';

@Module({
  providers: [
    PrismaClientService,
    PrismaService,
    UserRepository,
    QuestionRepository,
    AttemptRepository,
  ],
  exports: [UserRepository, QuestionRepository, AttemptRepository],
})
export class PrismaModule {}
