import { Injectable, Logger } from '@nestjs/common';
import { DataServiceService } from 'src/database/data-service.service';
import { AnswerChoice } from '../answer-choice/entities/answer-choice.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);

  constructor(private dataService: DataServiceService) {}

  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  async submit(submitAnswerDto: SubmitAnswerDto) {
    this.logger.debug(
      `sample of submitAnswerDto: ${JSON.stringify(
        {
          user_id: submitAnswerDto.user_id,
          sample_of_answersWithUserCf: submitAnswerDto.answersWithUserCf.slice(
            0,
            1,
          ),
        },
        undefined,
        2,
      )}`,
    );
    const { user_id, answersWithUserCf } = submitAnswerDto;
    const newAttempt = await this.dataService.attempt.create({ user_id });
    const learningTypesFinalCF = await this.calculateLearningTypeCf(
      answersWithUserCf,
    );
    await this.dataService.answer
      .createMany(
        answersWithUserCf.map((answer) => ({
          attempt_id: newAttempt.id,
          answer_choice_id: answer.id,
          user_cf: answer.user_cf,
        })),
      )
      .then(() => {
        this.logger.log(
          `User answers stored ${JSON.stringify({ userId: user_id })}`,
        );
      });
    await this.dataService.attemptResult.createMany(
      Object.entries(learningTypesFinalCF).map(
        ([learning_style_id, final_cf]) => ({
          attempt_id: newAttempt.id,
          learning_style_id,
          final_cf,
        }),
      ),
    );
    const maxCf = Math.max(...Object.values(learningTypesFinalCF));
    const [bestLearningStyleId] = Object.entries(learningTypesFinalCF).find(
      ([, cf]) => cf === maxCf,
    );
    this.logger.debug(
      `Best learning style ${JSON.stringify(
        { bestLearningStyleId, maxCf },
        undefined,
        2,
      )}`,
    );
    const bestLearningStyle = await this.dataService.learningStyle.findById(
      bestLearningStyleId,
    );
    const learningRecommendations =
      await this.dataService.learningRecommendation.findByLearningStyleId(
        bestLearningStyleId,
      );

    return {
      bestLearningStyle: bestLearningStyle.name,
      learningRecommendations,
    };
  }

  protected async calculateLearningTypeCf(
    answersWithUserCf: (AnswerChoice & { user_cf: number })[],
  ) {
    const learningTypes = await this.dataService.learningStyle.findAll();
    const learningTypesFinalCF = learningTypes.reduce((prev, current) => {
      prev[current.id] = 0;
      return prev;
    }, {} as Record<string, number>);
    for (const key in learningTypesFinalCF) {
      //* menghitung cf kombinasi (CF user * CF expert)
      const combinationCfs: number[] = answersWithUserCf
        .filter((answer) => answer.learning_style_id === key)
        .map(({ user_cf, expert_cf }) => user_cf * expert_cf);
      this.logger.debug(
        `Combination CFs ${JSON.stringify({
          type: key,
          combinationCfs,
        })}`,
      );
      //* menghitung CF final
      let oldCf = combinationCfs[0];
      for (let i = 1; i < combinationCfs.length; i++) {
        oldCf = oldCf + combinationCfs[i] * (1 - oldCf);
      }
      this.logger.debug(
        `Final CF ${JSON.stringify(
          {
            type: key,
            final_cf: oldCf,
          },
          undefined,
          2,
        )}`,
      );
      learningTypesFinalCF[key] = oldCf;
    }
    this.logger.debug(
      `learningTypesFinalCF ${JSON.stringify(
        learningTypesFinalCF,
        undefined,
        2,
      )}`,
    );
    return learningTypesFinalCF;
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
