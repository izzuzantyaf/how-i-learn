import { IsString } from 'class-validator';

export default class DeleteDto {
  @IsString()
  _id: string;
}
