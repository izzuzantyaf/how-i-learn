import { Module } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Respondent, RespondentSchema } from '../../schemas/respondent.schema';
import { PlaygroundController } from './playground.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Respondent.name, schema: RespondentSchema },
    ]),
  ],
  providers: [PlaygroundService],
  controllers: [PlaygroundController],
})
export class PlaygroundModule {}
