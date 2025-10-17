import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';

@Controller({ path: 'reports', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('metrics')
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  keyMetrics() {
    return this.reportsService.keyMetrics();
  }

  @Get('attendance')
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.STAFF)
  attendanceTrend() {
    return this.reportsService.attendanceTrend();
  }
}
