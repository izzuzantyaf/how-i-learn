import { PartialType } from '@nestjs/swagger';
import { CreateLearningStyleDto } from './create-learning-style.dto';

export class UpdateLearningStyleDto extends PartialType(CreateLearningStyleDto) {}
