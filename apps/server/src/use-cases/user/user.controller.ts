import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from 'src/use-cases/user/dto/user.dto';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { User } from 'src/use-cases/user/entities/user.entity';
import { UserService } from 'src/use-cases/user/user.service';
import { Logger } from '@nestjs/common/services';

const fakeUser = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: 'helloworld',
};

@ApiTags('user')
@Controller('api/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

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

  @Put()
  @ApiBody({
    type: UpdateUserDto,
    description: 'Mengupdate user',
    examples: {
      user: {
        value: { ...fakeUser, name: 'Jane Doe' },
      },
    },
  })
  @ApiOkResponse({ type: User })
  async update(@Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(updateUserDto);
    return new SuccessfulResponse('Profil berhasil diupdate', updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return new SuccessfulResponse('Akun berhasil dihapus');
  }
}
