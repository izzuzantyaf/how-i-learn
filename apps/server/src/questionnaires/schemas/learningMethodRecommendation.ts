import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LearningMethodRecommendationDocument =
  LearningMethodRecommendation & Document;

@Schema()
export class LearningMethodRecommendation {
  @Prop()
  type: string;

  @Prop()
  method: string;
}

export const LearningMethodRecommendationSchema = SchemaFactory.createForClass(
  LearningMethodRecommendation,
);
