import { Injectable } from '@nestjs/common';
import { CreateLearningStyleDto } from './dto/create-learning-style.dto';
import { UpdateLearningStyleDto } from './dto/update-learning-style.dto';

@Injectable()
export class LearningStyleService {
  create(createLearningStyleDto: CreateLearningStyleDto) {
    return 'This action adds a new learningStyle';
  }

  findAll() {
    return `This action returns all learningStyle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningStyle`;
  }

  update(id: number, updateLearningStyleDto: UpdateLearningStyleDto) {
    return `This action updates a #${id} learningStyle`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningStyle`;
  }
}
