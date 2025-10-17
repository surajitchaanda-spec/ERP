import { DataSource } from 'typeorm';
import configuration from '../config/configuration';
import { Student } from '../common/entities/student.entity';
import { Guardian } from '../common/entities/guardian.entity';
import { StaffMember } from '../common/entities/staff-member.entity';
import { Classroom } from '../common/entities/classroom.entity';
import { AttendanceRecord } from '../common/entities/attendance-record.entity';
import { Grade } from '../common/entities/grade.entity';
import { FeeInvoice } from '../common/entities/fee-invoice.entity';
import { Announcement } from '../common/entities/announcement.entity';
import { UserAccount } from '../common/entities/user-account.entity';

const config = configuration();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [
    Student,
    Guardian,
    StaffMember,
    Classroom,
    AttendanceRecord,
    Grade,
    FeeInvoice,
    Announcement,
    UserAccount,
  ],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});

export default AppDataSource;
