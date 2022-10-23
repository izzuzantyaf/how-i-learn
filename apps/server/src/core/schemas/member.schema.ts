import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Respondent } from './respondent.schema';

export type MemberDocument = Member & Document;

@Schema()
export class Member extends Respondent {
  @Prop({ type: MongoSchema.Types.ObjectId })
  _id: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
