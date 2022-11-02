import {
  User,
  UserConstructorProps,
} from 'src/use-cases/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactoryService {
  create(props: UserConstructorProps) {
    return new User(props);
  }

  createMany(arrayOfProps: UserConstructorProps[]) {
    const users = arrayOfProps.map((props) => new User(props));
    return users;
  }
}
