import { Injectable } from '@nestjs/common';
import { UserRepository } from './repos/user.repo';

@Injectable()
export class PrismaService {
  constructor(public users: UserRepository) {}
}
