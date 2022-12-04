import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LearningStyleService } from './learning-style.service';
import { CreateLearningStyleDto } from './dto/create-learning-style.dto';
import { UpdateLearningStyleDto } from './dto/update-learning-style.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('learning-style')
@Controller('api/learning-styles')
export class LearningStyleController {
  constructor(private readonly learningStyleService: LearningStyleService) {}

  @Post()
  create(@Body() createLearningStyleDto: CreateLearningStyleDto) {
    return this.learningStyleService.create(createLearningStyleDto);
  }

  @Get()
  findAll() {
    return this.learningStyleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningStyleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLearningStyleDto: UpdateLearningStyleDto,
  ) {
    return this.learningStyleService.update(+id, updateLearningStyleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningStyleService.remove(+id);
  }
}
