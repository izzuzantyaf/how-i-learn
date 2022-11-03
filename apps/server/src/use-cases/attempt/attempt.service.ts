import { Injectable, Logger } from '@nestjs/common';
import { DataServiceService } from 'src/database/data-service.service';
import { AnswerChoice } from '../answer-choice/entities/answer-choice.entity';
import { AttemptSubmitDto } from './dto/attempt-submit.dto';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@Injectable()
export class AttemptService {
  private readonly logger = new Logger(AttemptService.name);

  constructor(private dataService: DataServiceService) {}

  async create(createAttemptDto: CreateAttemptDto) {
    this.logger.debug(
      `createAttemptDto ${JSON.stringify(createAttemptDto, undefined, 2)}`,
    );
    const createdAttempt = await this.dataService.attempt.create(
      createAttemptDto,
    );
    this.logger.debug(
      `Created attempt ${JSON.stringify(createdAttempt, undefined, 2)}`,
    );
    this.logger.log(
      `Attempt created ${JSON.stringify({
        id: createdAttempt.id,
        userId: createdAttempt.user_id,
      })}`,
    );
    return createdAttempt;
  }

  async submit(attemptSubmitDto: AttemptSubmitDto) {
    this.logger.debug(
      `attemptSubmitDto ${JSON.stringify(attemptSubmitDto, undefined, 2)}`,
    );
    const { user_id, answersWithUserCf } = attemptSubmitDto;
    // create new attempt and retrive the id
    const attempt = await this.create({ user_id });
    // calculate result
    const learningTypesFinalCF = {
      VISUAL: 0,
      AUDITORY: 0,
      READ_WRITE: 0,
      KINESTHETIC: 0,
    };
    for (const key in learningTypesFinalCF) {
      learningTypesFinalCF[key] = this.calculateLearningTypeCf(
        answersWithUserCf,
        key,
      );
    }

    return;
  }

  calculateLearningTypeCf(
    answersWithUserCf: (AnswerChoice & { user_cf: number })[],
    learning_style_id: string,
  ) {
    // menghitung cf kombinasi (CF user * CF expert)
    const combinationCfs: number[] = answersWithUserCf
      .filter((answer) => answer.learning_style_id === learning_style_id)
      .map((answer) => answer.user_cf * answer.expert_cf);
    // menghitung CF final
    let oldCf = combinationCfs[0];
    for (let i = 1; i < combinationCfs.length; i++) {
      oldCf = oldCf + combinationCfs[i] * (1 - oldCf);
    }
    return oldCf;
  }

  async findAll() {
    return await this.dataService.question.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} attempt`;
  }

  update(id: number, updateAttemptDto: UpdateAttemptDto) {
    return `This action updates a #${id} attempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} attempt`;
  }
}
