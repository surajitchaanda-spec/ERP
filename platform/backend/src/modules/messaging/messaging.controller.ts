import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../common/entities/user-account.entity';

@Controller({ path: 'messaging', version: '1' })
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('config')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  config() {
    return this.messagingService.channelConfiguration();
  }

  @Post('dispatch/:channel')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PRINCIPAL)
  dispatch(@Param('channel') channel: 'sms' | 'email' | 'push', @Body() payload: Record<string, unknown>) {
    return this.messagingService.dispatch(channel, payload);
  }

  @Post('webhook/:provider')
  webhook(@Param('provider') provider: string, @Body() payload: Record<string, unknown>) {
    return this.messagingService.handleWebhook(provider, payload);
  }
}
