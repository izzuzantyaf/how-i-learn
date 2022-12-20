import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponse } from 'src/lib/api-response';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('answer')
@Controller('api/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Post('submit')
  async submit(@Body() submitAnswerDto: SubmitAnswerDto) {
    const result = await this.answerService.submit(submitAnswerDto);
    return new SuccessfulResponse('Jawaban berhasil disimpan', result);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
