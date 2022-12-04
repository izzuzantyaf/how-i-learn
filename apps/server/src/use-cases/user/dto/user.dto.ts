import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  id: number;
  email_confirmed?: Date | string;
}
