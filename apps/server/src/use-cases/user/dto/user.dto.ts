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
  @ApiProperty()
  id: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  password?: string;
}
