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
import { AttemptResultService } from './attempt-result.service';
import { CreateAttemptResultDto } from './dto/create-attempt-result.dto';
import { UpdateAttemptResultDto } from './dto/update-attempt-result.dto';

@ApiTags('attempt-result')
@Controller('api/attempt-results')
export class AttemptResultController {
  constructor(private readonly attemptResultService: AttemptResultService) {}

  @Post()
  create(@Body() createAttemptResultDto: CreateAttemptResultDto) {
    return this.attemptResultService.create(createAttemptResultDto);
  }

  @Get()
  findAll() {
    return this.attemptResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attemptResultService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttemptResultDto: UpdateAttemptResultDto,
  ) {
    return this.attemptResultService.update(+id, updateAttemptResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attemptResultService.remove(+id);
  }
}
