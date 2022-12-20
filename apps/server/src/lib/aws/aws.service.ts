import { Injectable } from '@nestjs/common';
import { SesService } from './ses/ses.service';

@Injectable()
export class AwsService {
  constructor(public ses: SesService) {}
}
