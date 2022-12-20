import { Injectable } from '@nestjs/common';
import { Question } from 'src/use-cases/question/entities/question.entity';
import { IQuestionRepo } from 'src/use-cases/question/interfaces/question-repo.interface';
import { PrismaClientService } from '../../../database/prisma/prisma-client.service';

@Injectable()
export class QuestionRepository implements IQuestionRepo {
  constructor(private prisma: PrismaClientService) {}

  async findAll(): Promise<Question[]> {
    const rawQuestions = await this.prisma.question.findMany({
      select: {
        id: true,
        question: true,
        answer_choices: {
          select: {
            id: true,
            answer: true,
            learning_style_id: true,
            expert_cf: true,
          },
        },
      },
    });
    const questions = rawQuestions.map((question) => new Question(question));
    return questions;
  }
}
