import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { PrismaClientService } from 'src/database/prisma/prisma-client.service';
import { CreateAttemptDto } from '../dto/create-attempt.dto';
import { Attempt } from '../entities/attempt.entity';
import { IAttemptRepo } from '../interfaces/attempt-repo.interface';

@Injectable()
export class AttemptRepository implements IAttemptRepo {
  private readonly logger = new Logger(AttemptRepository.name);

  constructor(private prisma: PrismaClientService) {}

  async create(data: CreateAttemptDto): Promise<Attempt> {
    let createdAttempt;
    try {
      createdAttempt = await this.prisma.attempt.create({
        data: {
          user_id: parseInt(data.user_id as string),
        },
      });
    } catch (error) {
      this.logger.debug(error);
      throw new BadRequestException(
        new ErrorResponse('Attempt creation failed'),
      );
    }
    return isNotEmpty(createdAttempt) ? new Attempt(createdAttempt) : null;
  }

  async findById(id: string | number): Promise<Attempt> {
    let attempt;
    try {
      attempt = await this.prisma.attempt.findUnique({
        where: { id: parseInt(id as string) },
      });
    } catch (error) {
      this.logger.debug(error);
    }
    return isNotEmpty(attempt) ? new Attempt(attempt) : null;
  }

  findByUserId(userId: string | number): Promise<Attempt[]> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string | number): Promise<Attempt> {
    throw new Error('Method not implemented.');
  }
}
