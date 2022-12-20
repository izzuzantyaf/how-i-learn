import { PartialType } from '@nestjs/swagger';
import { CreateAttemptDto } from './create-attempt.dto';

export class UpdateAttemptDto extends PartialType(CreateAttemptDto) {}
