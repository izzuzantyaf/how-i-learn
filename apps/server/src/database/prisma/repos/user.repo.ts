import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client.service';
import { IUserRepo } from 'src/core/interfaces/user-repo.interface';
import { User } from 'src/core/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos/user.dto';
import { isNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepo {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private prisma: PrismaClientService) {}

  async create(data: CreateUserDto): Promise<User> {
    return new User(await this.prisma.user.create({ data }));
  }

  async getAll(): Promise<User[]> {
    return (await this.prisma.user.findMany()).map((user) => new User(user));
  }

  async findById(id: number | string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id as string) },
    });
    return isNotEmpty(user) ? new User(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return isNotEmpty(user) ? new User(user) : null;
  }

  async update(newUser: UpdateUserDto): Promise<User> {
    let updatedUser;
    try {
      updatedUser = await this.prisma.user.update({
        where: {
          id: newUser.id as number,
        },
        data: newUser as Prisma.UserUpdateInput,
      });
    } catch (error) {
      this.logger.debug(error);
    }
    return isNotEmpty(updatedUser) ? new User(updatedUser) : null;
  }

  async deleteById(id: number | string): Promise<User | null> {
    let deletedUser;
    try {
      deletedUser = await this.prisma.user.delete({
        where: { id: parseInt(id as string) },
      });
    } catch (error) {
      this.logger.error(error);
    }
    return isNotEmpty(deletedUser) ? new User(deletedUser) : null;
  }

  async deleteByEmail(email: string): Promise<User | null> {
    const deletedUser = await this.prisma.user.delete({ where: { email } });
    return isNotEmpty(deletedUser) ? new User(deletedUser) : null;
  }
}
