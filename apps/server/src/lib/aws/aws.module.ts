import { Module } from '@nestjs/common';
import { SesModule } from './ses/ses.module';
import { AwsService } from './aws.service';

@Module({
  imports: [SesModule],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
