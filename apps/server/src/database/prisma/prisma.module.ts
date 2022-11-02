import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service';
import { PrismaService } from './prisma.service';
import { QuestionRepository } from '../../use-cases/question/repo/question.repo';
import { UserRepository } from '../../use-cases/user/repo/user.repo';

@Module({
  providers: [
    PrismaClientService,
    PrismaService,
    UserRepository,
    QuestionRepository,
  ],
  exports: [UserRepository, QuestionRepository],
})
export class PrismaModule {}
