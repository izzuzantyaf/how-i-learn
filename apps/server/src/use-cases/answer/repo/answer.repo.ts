import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Answer } from '../entities/answer.entity';
import { IAnswerRepo } from '../interfaces/answer-repo.interface';

@Injectable()
export class AnswerRepo implements IAnswerRepo {
  private readonly logger = new Logger(AnswerRepo.name);

  constructor(private prisma: PrismaClientService) {}

  async createMany(data: CreateAnswerDto[]): Promise<Answer[]> {
    const storedAnswers = await this.prisma.answer.createMany({ data });
    throw new Error('Method not implemented.');
  }
}
