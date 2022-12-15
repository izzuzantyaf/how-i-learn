import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { CreateAttemptResultDto } from '../dto/create-attempt-result.dto';
import { AttemptResult } from '../entities/attempt-result.entity';
import { IAttemptResultRepo } from '../interfaces/attempt-result-repo.interface';

@Injectable()
export class AttemptResultRepository implements IAttemptResultRepo {
  private readonly logger = new Logger(AttemptResultRepository.name);

  constructor(private prisma: PrismaClientService) {}
  async deleteByAttemptId(attempt_id: number): Promise<number> {
    let count: number = 0;
    try {
      count = (
        await this.prisma.attemptResult.deleteMany({ where: { attempt_id } })
      ).count;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
    return count;
  }

  async findMany(): Promise<AttemptResult[]> {
    const attempt_results = await this.prisma.attemptResult.findMany();
    return attempt_results.map(
      (attempt_result) => new AttemptResult(attempt_result),
    );
  }

  async findByAttemptId(attempt_id: number): Promise<AttemptResult[]> {
    const results = await this.prisma.attemptResult.findMany({
      select: {
        id: true,
        attempt_id: true,
        learning_style_id: true,
        final_cf: true,
      },
      where: { attempt_id },
    });
    return results.map((result) => new AttemptResult(result));
  }

  async createMany(
    data: CreateAttemptResultDto[],
  ): Promise<AttemptResult[] | number> {
    const storedResults = await this.prisma.attemptResult
      .createMany({ data })
      .then((result) => {
        this.logger.debug(
          `Attempt results stored ${JSON.stringify({ count: result.count })}`,
        );
        return result;
      })
      .catch((error) => {
        this.logger.debug(
          `Storing attempt results failed ${JSON.stringify(error)}`,
        );
        return undefined;
      });
    return storedResults?.count;
  }
}
