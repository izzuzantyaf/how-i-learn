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
    const attempt = await this.attemptService.create(createAttemptDto);
    return new SuccessfulResponse('History berhasil disimpan', attempt);
  }

  @Get()
  async findAll() {
    return await this.attemptService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const attempt = await this.attemptService.findById(parseInt(id));
    return new SuccessfulResponse('Successfully retrieved attempt', attempt);
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
  async remove(@Param('id') id: string) {
    await this.attemptService.remove(parseInt(id));
    return new SuccessfulResponse('History berhasil dihapus');
  }
}
