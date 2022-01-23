import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type LearningMethodRecommendationDocument =
  LearningMethodRecommendation & Document;

@Schema()
export class LearningMethodRecommendation {
  @Prop({ type: MongoSchema.Types.ObjectId })
  _id;

  @Prop()
  type: string;

  @Prop()
  method: string;
}

export const LearningMethodRecommendationSchema = SchemaFactory.createForClass(
  LearningMethodRecommendation,
);
