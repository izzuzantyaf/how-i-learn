import { IsString } from 'class-validator';

export default class UpdateDto {
  @IsString()
  _id: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsString()
  passwordConfirm: string;
}
