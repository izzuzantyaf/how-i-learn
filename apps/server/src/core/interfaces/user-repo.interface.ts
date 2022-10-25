import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepo {
  /**
   * Store a user to database
   * @param data User creation data
   */
  create(data: CreateUserDto): Promise<User>;
  /**
   * Get all users from database
   */
  getAll(): Promise<User[]>;
  /**
   * Find a user by id
   * @param id User id
   */
  findById(id: number | string): Promise<User | null>;
  /**
   * Find a user by email
   * @param email User email
   */
  findByEmail(email: string): Promise<User | null>;
  /**
   * Update user data in the database
   * @param data The new user data
   */
  update(data: UpdateUserDto): Promise<User>;
  /**
   * Delete a user by id
   * @param id User id
   */
  deleteById(id: number | string): Promise<User | null>;
  /**
   * Delete a user by email
   * @param email User email
   */
  deleteByEmail(email: string): Promise<User | null>;
}
