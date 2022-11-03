import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuccessfulResponse } from 'src/core/dtos/response.dto';
import { AttemptService } from './attempt.service';
import { AttemptSubmitDto } from './dto/attempt-submit.dto';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@Controller('api/attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Post()
  async create(@Body() createAttemptDto: CreateAttemptDto) {
    const createdAttempt = await this.attemptService.create(createAttemptDto);
    return createdAttempt;
  }

  @Get('submit')
  async submit(@Body() attemptSubmitDto: AttemptSubmitDto) {
    return;
  }

  @Get()
  async findAll() {
    return await this.attemptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attemptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttemptDto: UpdateAttemptDto) {
    return this.attemptService.update(+id, updateAttemptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attemptService.remove(+id);
  }
}
