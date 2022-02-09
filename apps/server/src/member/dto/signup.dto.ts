import { IsEmail, IsString } from 'class-validator';

export default class SignUpDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  passwordConfirm: string;
}
