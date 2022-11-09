import { AnswerChoice } from '@prisma/client';

export class SubmitAnswerDto {
  user_id?: number;
  answersWithUserCf: (AnswerChoice & { user_cf: number })[];
}
