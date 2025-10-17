import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';

@Controller({ path: 'students', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.STAFF)
  list(@Query('page') page = 1, @Query('limit') limit = 25) {
    return this.studentsService.list(Number(page), Number(limit));
  }
}
