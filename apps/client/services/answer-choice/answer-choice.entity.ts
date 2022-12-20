export type AnswerChoice = {
  id?: number;
  question_id?: number;
  learning_style_id: string;
  answer: string;
  expert_cf: number;
  created_at?: Date;
  updated_at?: Date;
};
