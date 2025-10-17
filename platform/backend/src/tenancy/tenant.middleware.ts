import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly tenantContext: TenantContextService,
  ) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const headerKey = this.configService.get<string>('multiTenant.headerKey');
    const defaultTenantId = this.configService.get<string>('multiTenant.defaultTenantId');
    const tenantId = req.headers[headerKey?.toLowerCase() ?? 'x-tenant-id'];
    this.tenantContext.setTenantId(
      typeof tenantId === 'string' && tenantId.length > 0 ? tenantId : (defaultTenantId as string),
    );
    next();
  }
}
