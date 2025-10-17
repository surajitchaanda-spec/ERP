import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserAccount, UserRole } from '../common/entities/user-account.entity';
import { TenantContextService } from '../tenancy/tenant-context.service';

interface JwtPayload {
  sub: string;
  role: UserRole;
  tenantId: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly usersRepository: Repository<UserAccount>,
    private readonly jwtService: JwtService,
    private readonly tenantContext: TenantContextService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserAccount> {
    const tenantId = this.tenantContext.getTenantId();
    const user = await this.usersRepository.findOne({ where: { email, tenantId } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: UserAccount) {
    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      tenantId: user.tenantId,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, role: UserRole, tenantId: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      passwordHash,
      role,
      tenantId,
    });
    return this.usersRepository.save(user);
  }

  async socialLogin(provider: string, externalId: string, email: string) {
    const tenantId = this.tenantContext.getTenantId();
    let user = await this.usersRepository.findOne({
      where: { provider, externalId, tenantId },
    });
    if (!user) {
      user = this.usersRepository.create({
        provider,
        externalId,
        email,
        tenantId,
        passwordHash: '',
        role: UserRole.PARENT,
      });
      await this.usersRepository.save(user);
    }
    return this.login(user);
  }
}
