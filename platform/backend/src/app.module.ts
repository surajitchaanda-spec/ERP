import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { DatabaseConfigService } from './config/database-config.service';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { GradesModule } from './modules/grades/grades.module';
import { FeesModule } from './modules/fees/fees.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { EntitiesModule } from './common/entities/entities.module';
import { ReportsModule } from './modules/reports/reports.module';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    EntitiesModule,
    TenancyModule,
    AuthModule,
    AttendanceModule,
    GradesModule,
    FeesModule,
    AnnouncementsModule,
    MessagingModule,
    ReportsModule,
    StudentsModule,
  ],
})
export class AppModule {}
