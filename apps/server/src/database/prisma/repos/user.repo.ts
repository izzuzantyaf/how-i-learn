import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client.service';
import { IUserRepo } from 'src/core/interfaces/user-repo.interface';
import { User } from 'src/core/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos/user.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserRepository implements IUserRepo {
  constructor(private prisma: PrismaClientService) {}

  async create(data: CreateUserDto) {
    return new User(await this.prisma.user.create({ data }));
  }

  async getAll(): Promise<User[]> {
    return (await this.prisma.user.findMany()).map((user) => new User(user));
  }

  async findById(id: number | string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id as string) },
    });
    return isNotEmpty(user) ? new User(user) : null;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return isNotEmpty(user) ? new User(user) : null;
  }

  async update(newUser: UpdateUserDto) {
    return new User(
      await this.prisma.user.update({
        where: {
          id: newUser.id,
          email: newUser.email,
        },
        data: newUser,
      }),
    );
  }

  async deleteById(id: number | string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id: parseInt(id as string) },
    });
    return isNotEmpty(deletedUser) ? new User(deletedUser) : null;
  }

  async deleteByEmail(email: string) {
    const deletedUser = await this.prisma.user.delete({ where: { email } });
    return isNotEmpty(deletedUser) ? new User(deletedUser) : null;
  }
}
