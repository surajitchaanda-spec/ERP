import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TenantContextService } from '../../tenancy/tenant-context.service';
import { UserRole } from '../../common/entities/user-account.entity';

export interface JwtPayload {
  sub: string;
  tenantId: string;
  role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly tenantContext: TenantContextService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }

  validate(payload: JwtPayload) {
    this.tenantContext.setTenantId(payload.tenantId);
    return payload;
  }
}
