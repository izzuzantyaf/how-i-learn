import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { DataServiceService } from 'src/database/data-service.service';
import { ErrorResponse } from 'src/lib/api-response';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';
import { Attempt } from './entities/attempt.entity';

@Injectable()
export class AttemptService {
  private readonly logger = new Logger(AttemptService.name);

  constructor(private dataService: DataServiceService) {}

  async create(createAttemptDto: CreateAttemptDto) {
    return await this.dataService.attempt.create(createAttemptDto);
  }

  async findAll() {
    return await this.dataService.question.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} attempt`;
  }

  findById(id: number) {
    return this.dataService.attempt.findWithBestLearningTypeAndRecommendation(
      id,
    );
  }

  async findByUser(userId: number) {
    const attempts = (await this.dataService.attempt.findByUserId(userId))
      .sort((a, b) => {
        if (a.created_at > b.created_at) return -1;
        else if (a.created_at < b.created_at) return 1;
        else return 0;
      })
      .map((attempt) => {
        const finalCfs = attempt.attempt_results.map(
          (attemptResult) => attemptResult.final_cf,
        );
        const maxFinalCF = Math.max(...finalCfs);
        const type_result = attempt.attempt_results.find(
          (attemptResult) => attemptResult.final_cf === maxFinalCF,
        ).learning_style.name;
        return {
          ...attempt,
          type_result,
        };
      });
    return attempts;
  }

  update(id: number, updateAttemptDto: UpdateAttemptDto) {
    return `This action updates a #${id} attempt`;
  }

  async remove(id: number) {
    this.logger.debug(`Deleting attempt ${id}...`);
    let deletedAttempt: Attempt;
    try {
      // delete attempt result
      await this.dataService.attemptResult.deleteByAttemptId(id);
      // delete answers
      await this.dataService.answer.deleteByAttemptId(id);
      // delete attempt
      deletedAttempt = await this.dataService.attempt.deleteById(id);
    } catch (err) {
      this.logger.debug(err);
      throw new BadRequestException(new ErrorResponse('History gagal dihapus'));
    }
    this.logger.log(`Attempt deleted ${JSON.stringify(deletedAttempt)}`);
    return deletedAttempt;
  }
}
