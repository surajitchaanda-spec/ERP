import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserRole } from '../common/entities/user-account.entity';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.role, dto.tenantId);
  }

  @Post('password/request')
  requestReset(@Body() _dto: RequestResetDto) {
    return { message: 'If the account exists a password reset email has been sent.' };
  }

  @Post('password/reset')
  resetPassword(@Body() _dto: ResetPasswordDto) {
    return { message: 'Password reset token processed (mock implementation).' };
  }

  @Post('social')
  social() {
    return this.authService.socialLogin('mock', 'demo', 'demo@example.com');
  }

  @Post('impersonate')
  impersonate() {
    return this.authService.login({
      id: 'system',
      tenantId: 'system',
      passwordHash: '',
      email: 'system@erp.local',
      provider: 'system',
      externalId: 'system',
      role: UserRole.ADMIN,
      active: true,
    });
  }
}
