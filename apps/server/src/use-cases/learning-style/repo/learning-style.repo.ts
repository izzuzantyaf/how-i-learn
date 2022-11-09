import { Injectable, Logger } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { LearningStyle } from '../entities/learning-style.entity';
import { ILearningStyleRepo } from '../interfaces/learning-style-repo.interface';

@Injectable()
export class LearningStyleRepository implements ILearningStyleRepo {
  private readonly logger = new Logger(LearningStyleRepository.name);

  constructor(private prisma: PrismaClientService) {}

  async findAll(): Promise<LearningStyle[]> {
    const results = await this.prisma.learningStyle.findMany();
    return results.map((result) => new LearningStyle(result));
  }

  async findById(id: string): Promise<LearningStyle> {
    const result = await this.prisma.learningStyle.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: { id },
    });

    return isNotEmpty(result) ? new LearningStyle(result) : null;
  }
}
