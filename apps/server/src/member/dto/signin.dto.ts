import { IsEmail, IsString } from 'class-validator';

export default class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
