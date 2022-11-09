import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Answer } from '../entities/answer.entity';
import { IAnswerRepo } from '../interfaces/answer-repo.interface';

@Injectable()
export class AnswerRepository implements IAnswerRepo {
  private readonly logger = new Logger(AnswerRepository.name);

  constructor(private prisma: PrismaClientService) {}

  async createMany(data: CreateAnswerDto[]): Promise<Answer[] | number> {
    const storedAnswers = await this.prisma.answer
      .createMany({ data })
      .then((result) => {
        this.logger.debug(
          `Answers stored ${JSON.stringify({ count: result.count })}`,
        );
        return result;
      })
      .catch((error) => {
        this.logger.debug(`Storing answers failed ${JSON.stringify(error)}`);
        return undefined;
      });
    return storedAnswers?.count;
  }
}
