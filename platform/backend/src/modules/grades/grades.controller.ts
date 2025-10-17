import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';

@Controller({ path: 'grades', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Get()
  @Roles(UserRole.STAFF, UserRole.PRINCIPAL, UserRole.ADMIN, UserRole.PARENT)
  findAll(
    @Query('subject') subject?: string,
    @Query('studentId') studentId?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 25,
  ) {
    return this.gradesService.findAll({ subject, studentId }, Number(page), Number(limit));
  }

  @Post()
  @Roles(UserRole.STAFF, UserRole.PRINCIPAL)
  record(@Body() body: { studentId: string; subject: string; score: number; comments?: string }) {
    return this.gradesService.recordGrade(body.studentId, body.subject, body.score, body.comments);
  }
}
