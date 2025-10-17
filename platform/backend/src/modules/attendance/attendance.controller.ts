import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceStatus } from '../../common/entities/attendance-record.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';

@Controller({ path: 'attendance', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  @Roles(UserRole.STAFF, UserRole.PRINCIPAL, UserRole.ADMIN)
  async list(@Query('page') page = 1, @Query('limit') limit = 25) {
    const [records, total] = await this.attendanceService.findAll(Number(page), Number(limit));
    return { records, total, page: Number(page), limit: Number(limit) };
  }

  @Post()
  @Roles(UserRole.STAFF, UserRole.PRINCIPAL)
  mark(@Body() body: { studentId: string; status: AttendanceStatus; date?: string; notes?: string }) {
    return this.attendanceService.markAttendance(
      body.studentId,
      body.status,
      body.date ? new Date(body.date) : new Date(),
      body.notes,
    );
  }
}
