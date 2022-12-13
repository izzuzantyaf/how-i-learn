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

  async findByUser(userId: number) {
    const attempts = (await this.dataService.attempt.findByUserId(userId)).sort(
      (a, b) => {
        if (a.created_at > b.created_at) return -1;
        else if (a.created_at < b.created_at) return 1;
        else return 0;
      },
    );
    return attempts;
  }

  update(id: number, updateAttemptDto: UpdateAttemptDto) {
    return `This action updates a #${id} attempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} attempt`;
  }
}
