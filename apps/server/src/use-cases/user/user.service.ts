import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { CreateUserDto, UpdateUserDto } from 'src/use-cases/user/dto/user.dto';
import { ErrorResponse } from 'src/lib/api-response';
import { DataServiceService } from 'src/database/data-service.service';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private dataService: DataServiceService,
    private userFactory: UserFactoryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.debug(
      `createUserDto ${JSON.stringify(createUserDto, undefined, 2)}`,
    );
    const newUser = this.userFactory.create(createUserDto);
    const errors = newUser.validateProps();
    if (isNotEmpty(errors)) {
      this.logger.debug(
        `User data is not valid ${JSON.stringify(errors, undefined, 2)}`,
      );
      this.logger.log(
        `User creation failed ${JSON.stringify({ name: createUserDto.name })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data tidak valid', { errors }),
      );
    }
    const existingUser = await this.dataService.user.findByEmail(newUser.email);
    if (isNotEmpty(existingUser)) {
      this.logger.log(
        `Email is already registered to user ${JSON.stringify({
          userId: existingUser.id,
        })}`,
      );
      this.logger.log(
        `User creation failed ${JSON.stringify({ name: createUserDto.name })}`,
      );
      throw new ConflictException(new ErrorResponse('Email sudah terdaftar'));
    }
    await newUser.hashPassword();
    const storedUser = await this.dataService.user.create(newUser);
    this.logger.debug(
      `Stored user ${JSON.stringify(storedUser, undefined, 2)}`,
    );
    this.logger.log(
      `User created ${JSON.stringify({ userId: storedUser.id })}`,
    );
    return storedUser;
  }

  async getAll() {
    return await this.dataService.user.getAll();
  }

  async findById(id: number) {
    this.logger.debug(
      `Find user by id ${JSON.stringify({ id }, undefined, 2)}`,
    );
    const user = await this.dataService.user.findById(id);
    if (!user) {
      this.logger.log(`User not found ${JSON.stringify({ id }, undefined, 2)}`);
      throw new BadRequestException(new ErrorResponse('User tidak ditemukan'));
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    this.logger.debug(
      `updateUserDto ${JSON.stringify(updateUserDto, undefined, 2)}`,
    );
    const user = this.userFactory.create(updateUserDto);
    const errors = user.validateProps();
    if (isNotEmpty(errors)) {
      this.logger.debug(
        `User data is not valid ${JSON.stringify(errors, undefined, 2)}`,
      );
      this.logger.log(
        `User update failed ${JSON.stringify({ userId: updateUserDto.id })}`,
      );
      throw new BadRequestException(
        new ErrorResponse('Data user tidak valid', errors),
      );
    }
    await user.hashPassword();
    const updatedUser = await this.dataService.user.update(
      user as UpdateUserDto,
    );
    this.logger.debug(
      `Updated user ${JSON.stringify(updatedUser, undefined, 2)}`,
    );
    this.logger.log(
      `User updated ${JSON.stringify({ userId: updatedUser.id })}`,
    );
    return updatedUser;
  }

  async delete(id: number) {
    const deletedUser = await this.dataService.user.deleteById(id);
    if (isEmpty(deletedUser)) {
      this.logger.log(
        `User deletion failed ${JSON.stringify({
          userId: id,
        })}`,
      );
      throw new BadRequestException(new ErrorResponse('Akun gagal dihapus'));
    }
    this.logger.log(
      `User deleted ${JSON.stringify({ userId: deletedUser.id })}`,
    );
    return deletedUser;
  }

  async checkUserCredentials(email: string, password: string) {
    const user = await this.dataService.user.findByEmail(email);
    this.logger.debug(
      `User with email ${email} ${JSON.stringify(user, undefined, 2)}`,
    );
    if (isEmpty(user)) {
      this.logger.log('User credentials invalid');
      throw new UnauthorizedException(new ErrorResponse('Login gagal'));
    }
    const isPasswordMatch = await user.verifyPassword(password);
    this.logger.debug(
      `Password match ${JSON.stringify({ isPasswordMatch }, undefined, 2)}`,
    );
    if (!isPasswordMatch) {
      this.logger.log('User credentials invalid');
      throw new UnauthorizedException(new ErrorResponse('Login gagal'));
    }
    return user;
  }
}
