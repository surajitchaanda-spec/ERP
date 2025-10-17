import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserRole } from '../common/entities/user-account.entity';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { ImpersonateDto } from './dto/impersonate.dto';
import { TenantContextService } from '../tenancy/tenant-context.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tenantContext: TenantContextService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  impersonate(@Body() dto: ImpersonateDto) {
    const tenantId = this.tenantContext.getTenantId();
    return this.authService.impersonate(dto.userId, tenantId);
  }
}
