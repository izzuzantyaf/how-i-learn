import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Respondent } from './respondent.schema';

export type RspdDocument = Rspd & Document;

@Schema()
export class Rspd extends Respondent {}

export const RspdSchema = SchemaFactory.createForClass(Rspd);
