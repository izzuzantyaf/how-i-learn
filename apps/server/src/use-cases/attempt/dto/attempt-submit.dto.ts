import { AnswerChoice } from 'src/use-cases/answer-choice/entities/answer-choice.entity';

export class AttemptSubmitDto {
  user_id?: number;
  answersWithUserCf: (AnswerChoice & { user_cf: number })[];
}
