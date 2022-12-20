import { AnswerChoice } from "../../answer-choice/answer-choice.entity";

export type SubmitAnswerDto = {
  user_id?: number;
  answersWithUserCf: (AnswerChoice & { user_cf: number })[];
};
