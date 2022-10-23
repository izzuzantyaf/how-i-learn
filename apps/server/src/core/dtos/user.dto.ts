import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UpdateUserDto {
  _id: string;
  id: number;
  name?: string;
  email?: string;
  password?: string;
}
