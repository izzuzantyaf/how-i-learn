import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerChoiceService } from './answer-choice.service';
import { CreateAnswerChoiceDto } from './dto/create-answer-choice.dto';
import { UpdateAnswerChoiceDto } from './dto/update-answer-choice.dto';

@Controller('answer-choice')
export class AnswerChoiceController {
  constructor(private readonly answerChoiceService: AnswerChoiceService) {}

  @Post()
  create(@Body() createAnswerChoiceDto: CreateAnswerChoiceDto) {
    return this.answerChoiceService.create(createAnswerChoiceDto);
  }

  @Get()
  findAll() {
    return this.answerChoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerChoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerChoiceDto: UpdateAnswerChoiceDto) {
    return this.answerChoiceService.update(+id, updateAnswerChoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerChoiceService.remove(+id);
  }
}
