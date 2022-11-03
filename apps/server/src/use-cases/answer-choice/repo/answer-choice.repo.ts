import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { AnswerChoice } from '../entities/answer-choice.entity';
import { IAnswerChoiceRepo } from '../interfaces/answer-choice-repo.interface';

@Injectable()
export class AnswerChoiceRepo implements IAnswerChoiceRepo {
  private readonly logger = new Logger(AnswerChoiceRepo.name);

  constructor(private prisma: PrismaClientService) {}

  async findMany(): Promise<AnswerChoice[]> {
    return (await this.prisma.answerChoice.findMany()).map(
      (answerChoice) => new AnswerChoice(answerChoice),
    );
  }
}
