import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeesService } from './fees.service';
import { FeesController } from './fees.controller';
import { FeeInvoice } from '../../common/entities/fee-invoice.entity';
import { Student } from '../../common/entities/student.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeeInvoice, Student]), TenancyModule],
  providers: [FeesService],
  controllers: [FeesController],
})
export class FeesModule {}
