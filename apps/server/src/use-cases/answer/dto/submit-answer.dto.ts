import { AnswerChoice } from 'src/use-cases/answer-choice/entities/answer-choice.entity';

export class SubmitAnswerDto {
  user_id?: number;
  answersWithUserCf: (AnswerChoice & { user_cf: number })[];
}
