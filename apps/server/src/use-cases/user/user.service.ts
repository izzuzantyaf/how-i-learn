import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos/user.dto';
import { ErrorResponse } from 'src/core/dtos/response.dto';
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
    const newUser = this.userFactory.create(createUserDto);
    const errors = newUser.validateProps();
    if (isNotEmpty(errors)) {
      this.logger.log(`User data is not valid ${JSON.stringify(errors)}`);
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

  async update(updateUserDto: UpdateUserDto) {
    const user = this.userFactory.create(updateUserDto);
    const errors = user.validateProps();
    if (isNotEmpty(errors)) {
      this.logger.log(`User data is not valid ${JSON.stringify(errors)}`);
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

  async delete(id: string) {
    const deletedUser = await this.dataService.user.deleteById(id);
    if (isEmpty(deletedUser)) {
      this.logger.log(
        `User deletion failed ${JSON.stringify({
          id: deletedUser.id,
        })}`,
      );
      throw new BadRequestException(new ErrorResponse('Akun gagal dihapus'));
    }
    return deletedUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.dataService.user.findByEmail(email);
    if (isEmpty(user)) {
      this.logger.log(
        `User signin failed ${JSON.stringify({ user: user.id })}`,
      );
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    }
    const isPasswordMatch = await user.verifyPassword(password);
    if (!isPasswordMatch) {
      this.logger.log(
        `User signin failed ${JSON.stringify({ user: user.id })}`,
      );
      throw new BadRequestException(new ErrorResponse('Login gagal'));
    }
    return user;
  }
}
