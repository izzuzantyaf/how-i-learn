import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type RespondentDocument = Respondent & Document;

@Schema()
export class Respondent {
  @Prop({ type: MongoSchema.Types.ObjectId })
  _id;
  @Prop()
  name: string;
  @Prop()
  university: string;
  @Prop()
  major: string;
  @Prop()
  age: number;
  @Prop({ type: Object })
  learningTypes;
  @Prop()
  bestLearningTypes: string[];
  @Prop({ type: Array })
  learningMethodRecommendations;
}

export const RespondentSchema = SchemaFactory.createForClass(Respondent);
