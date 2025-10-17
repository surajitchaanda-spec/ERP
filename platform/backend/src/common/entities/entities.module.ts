import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Guardian } from './guardian.entity';
import { StaffMember } from './staff-member.entity';
import { Classroom } from './classroom.entity';
import { AttendanceRecord } from './attendance-record.entity';
import { Grade } from './grade.entity';
import { FeeInvoice } from './fee-invoice.entity';
import { Announcement } from './announcement.entity';
import { UserAccount } from './user-account.entity';

const entities = [
  Student,
  Guardian,
  StaffMember,
  Classroom,
  AttendanceRecord,
  Grade,
  FeeInvoice,
  Announcement,
  UserAccount,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
