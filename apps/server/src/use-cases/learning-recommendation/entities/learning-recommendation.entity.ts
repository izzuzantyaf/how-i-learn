export class LearningRecommendation {
  id?: number;
  learning_style_id?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data: LearningRecommendation) {
    Object.assign(this, data);
  }
}
