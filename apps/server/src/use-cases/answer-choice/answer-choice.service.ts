import { Injectable } from '@nestjs/common';
import { CreateAnswerChoiceDto } from './dto/create-answer-choice.dto';
import { UpdateAnswerChoiceDto } from './dto/update-answer-choice.dto';

@Injectable()
export class AnswerChoiceService {
  create(createAnswerChoiceDto: CreateAnswerChoiceDto) {
    return 'This action adds a new answerChoice';
  }

  findAll() {
    return `This action returns all answerChoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerChoice`;
  }

  update(id: number, updateAnswerChoiceDto: UpdateAnswerChoiceDto) {
    return `This action updates a #${id} answerChoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerChoice`;
  }
}
