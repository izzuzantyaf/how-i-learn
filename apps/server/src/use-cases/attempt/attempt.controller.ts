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
import { AttemptService } from './attempt.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@ApiTags('attempt')
@Controller('api/attempts')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) {}

  @Post()
  async create(@Body() createAttemptDto: CreateAttemptDto) {
    return await this.attemptService.create(createAttemptDto);
  }

  @Get()
  async findAll() {
    return await this.attemptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attemptService.findOne(+id);
  }

  @Get('user/:id')
  async findByUserId(@Param('id') id: string) {
    const attempts = await this.attemptService.findByUser(parseInt(id));
    return new SuccessfulResponse('Successfully retrieved attempts', attempts);
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
