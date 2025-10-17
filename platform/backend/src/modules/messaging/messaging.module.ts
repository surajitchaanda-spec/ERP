import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  controllers: [MessagingController],
  providers: [MessagingService],
})
export class MessagingModule {}
