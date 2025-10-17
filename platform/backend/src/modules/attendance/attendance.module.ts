import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceRecord } from '../../common/entities/attendance-record.entity';
import { Student } from '../../common/entities/student.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRecord, Student]), TenancyModule],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
