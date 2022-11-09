import { Injectable } from '@nestjs/common';
import { CreateAttemptResultDto } from './dto/create-attempt-result.dto';
import { UpdateAttemptResultDto } from './dto/update-attempt-result.dto';

@Injectable()
export class AttemptResultService {
  create(createAttemptResultDto: CreateAttemptResultDto) {
    return 'This action adds a new attemptResult';
  }

  findAll() {
    return `This action returns all attemptResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attemptResult`;
  }

  update(id: number, updateAttemptResultDto: UpdateAttemptResultDto) {
    return `This action updates a #${id} attemptResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} attemptResult`;
  }
}
