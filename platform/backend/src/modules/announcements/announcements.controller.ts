import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';

@Controller({ path: 'announcements', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL, UserRole.STAFF, UserRole.PARENT)
  list(@Query('page') page = 1, @Query('limit') limit = 25) {
    return this.announcementsService.list(Number(page), Number(limit));
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  create(
    @Body()
    body: { title: string; content: string; scheduledAt?: string; channels?: string[]; staffId?: string },
  ) {
    return this.announcementsService.create({
      title: body.title,
      content: body.content,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
      channels: body.channels,
      staffId: body.staffId,
    });
  }
}
