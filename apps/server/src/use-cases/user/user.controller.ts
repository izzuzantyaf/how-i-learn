import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { User } from 'src/core/entities/user.entity';
import { UserService } from 'src/use-cases/user/user.service';

const fakeUser = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: 'helloworld',
};

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    type: CreateUserDto,
    description: 'Menambahkan user baru',
    examples: {
      user: {
        value: fakeUser,
      },
    },
  })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const storedUser = await this.userService.create(createUserDto);
    return new SuccessfulResponse('Registrasi berhasil', storedUser);
  }

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return new SuccessfulResponse('Sukses', users);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return new SuccessfulResponse('Akun berhasil dihapus');
  }
}
