import { PartialType } from '@nestjs/swagger';
import { CreateAttemptResultDto } from './create-attempt-result.dto';

export class UpdateAttemptResultDto extends PartialType(CreateAttemptResultDto) {}
