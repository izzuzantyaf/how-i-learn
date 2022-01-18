import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Respondent } from './respondent.schema';

export type MemberDocument = Member & Document;

@Schema()
export class Member extends Respondent {
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
