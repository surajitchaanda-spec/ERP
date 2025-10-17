import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../common/entities/student.entity';
import { Guardian } from '../../common/entities/guardian.entity';
import { AttendanceRecord } from '../../common/entities/attendance-record.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Guardian, AttendanceRecord]), TenancyModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
