import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { Announcement } from '../../common/entities/announcement.entity';
import { StaffMember } from '../../common/entities/staff-member.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, StaffMember]), TenancyModule],
  providers: [AnnouncementsService],
  controllers: [AnnouncementsController],
})
export class AnnouncementsModule {}
