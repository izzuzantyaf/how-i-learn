import { Injectable } from '@nestjs/common';
import { AttemptRepository } from 'src/use-cases/attempt/repo/attempt.repo';
import { QuestionRepository } from '../../use-cases/question/repo/question.repo';
import { UserRepository } from '../../use-cases/user/repo/user.repo';

@Injectable()
export class PrismaService {
  constructor(
    public user: UserRepository,
    public question: QuestionRepository,
    public attempt: AttemptRepository,
  ) {}
}
