import { Injectable, Logger } from '@nestjs/common';
import { DataServiceService } from 'src/database/data-service.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@Injectable()
export class AttemptService {
  private readonly logger = new Logger(AttemptService.name);

  constructor(private dataService: DataServiceService) {}

  async create(createAttemptDto: CreateAttemptDto) {
    return 'This action adds a new attempt';
  }

  async findAll() {
    return await this.dataService.question.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} attempt`;
  }

  update(id: number, updateAttemptDto: UpdateAttemptDto) {
    return `This action updates a #${id} attempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} attempt`;
  }
}
