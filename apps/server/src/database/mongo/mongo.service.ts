import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/use-cases/user/entities/user.entity';
import { userSeeder } from '../seeds/user.seed';
import { UserMongoRepository } from '../../use-cases/user/repo/user-mongo.repo';

@Injectable()
export class MongoService {
  users: UserMongoRepository;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.users = new UserMongoRepository(this.userModel);
    this.seedUser();
  }

  protected async seedUser() {
    const user = new User(userSeeder);
    await user.hashPassword();
    this.users.seed(user);
  }
}
