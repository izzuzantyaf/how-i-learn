import { AnswerChoice } from "../answer-choice/answer-choice.entity";

export type Question = {
  id?: number;
  question: string;
  answer_choices: AnswerChoice[];
  created_at?: Date | string;
  updated_at?: Date | string;
};
