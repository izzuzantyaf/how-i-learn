import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../../use-cases/question/repo/question.repo';
import { UserRepository } from '../../use-cases/user/repo/user.repo';

@Injectable()
export class PrismaService {
  constructor(
    public user: UserRepository,
    public question: QuestionRepository,
  ) {}
}
