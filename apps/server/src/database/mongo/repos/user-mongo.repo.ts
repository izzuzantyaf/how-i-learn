import { User, UserDocument } from '../../../core/entities/user.entity';
import { MongoGenericRepository } from './mongo-generic.repo';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { IUserRepo } from 'src/core/interfaces/user-repo.interface';
import { UpdateUserDto } from 'src/core/dtos/user.dto';

export class UserMongoRepository
  extends MongoGenericRepository<User>
  implements IUserRepo
{
  constructor(repository: Model<UserDocument>) {
    super(repository);
  }

  findById(id: string | number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(data: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async seed(user: User) {
    const userCollection = await this._repository.findOne().exec();
    if (isEmpty(userCollection)) {
      this._repository.create(user);
      console.log('users collection seeded successfuly');
    }
  }

  getByEmail(email: string) {
    return this._repository.findOne({ email: email }).exec();
  }

  deleteByEmail(email: string) {
    return this._repository.findOneAndDelete({ email: email }).exec();
  }
}
