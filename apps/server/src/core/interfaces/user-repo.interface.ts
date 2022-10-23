import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepo {
  create(data: CreateUserDto): Promise<User>;
  getAll(): Promise<User[]>;
  findById(id: number | string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(data: UpdateUserDto): Promise<User>;
  deleteById(id: number | string): Promise<User | null>;
  deleteByEmail(email: string): Promise<User | null>;
}
