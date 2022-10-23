import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/core/dtos/user.dto';
import { ErrorResponse } from 'src/core/dtos/response.dto';
import { DataServiceService } from 'src/database/data-service.service';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserService {
  constructor(
    private dataService: DataServiceService,
    private userFactoryService: UserFactoryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('Incoming data :', createUserDto);
    const newUser = this.userFactoryService.create(createUserDto);
    const errors = newUser.validateProps();
    if (isNotEmpty(errors))
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors }),
      );
    const existingUser = await this.dataService.users.findByEmail(
      newUser.email,
    );
    console.log('Existing user :', existingUser);
    if (isNotEmpty(existingUser))
      throw new ConflictException(new ErrorResponse('Email sudah terdaftar'));
    await newUser.hashPassword();
    const storedUser = await this.dataService.users.create(newUser);
    console.log('Stored user :', storedUser);
    return storedUser;
  }

  async getAll() {
    return await this.dataService.users.getAll();
  }

  async delete(id: string) {
    console.log('User id :', id);
    const deletedUser = await this.dataService.users.deleteById(id);
    console.log('Deleted user :', deletedUser);
    if (isEmpty(deletedUser))
      throw new BadRequestException(new ErrorResponse('Akun gagal dihapus'));
    return deletedUser;
  }

  async validateUser(email: string, password: string) {
    console.log('Incoming credentials :', { email, password });
    const user = await this.dataService.users.findByEmail(email);
    console.log('User from database :', user);
    if (isEmpty(user))
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    const isPasswordMatch = await user.verifyPassword(password);
    console.log('Is password match :', isPasswordMatch);
    if (!isPasswordMatch)
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    return user;
  }
}
