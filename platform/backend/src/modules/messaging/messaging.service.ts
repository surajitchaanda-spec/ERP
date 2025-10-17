import { Injectable, Logger } from '@nestjs/common';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);

  constructor(private readonly tenantContext: TenantContextService) {}

  dispatch(channel: 'sms' | 'email' | 'push', payload: Record<string, unknown>) {
    const tenantId = this.tenantContext.getTenantId();
    this.logger.log(`Dispatching ${channel} message for tenant ${tenantId}: ${JSON.stringify(payload)}`);
    return { status: 'queued', channel, tenantId };
  }

  handleWebhook(provider: string, payload: Record<string, unknown>) {
    const tenantId = this.tenantContext.getTenantId();
    this.logger.log(`Received webhook from ${provider} for tenant ${tenantId}: ${JSON.stringify(payload)}`);
    return { received: true };
  }

  channelConfiguration() {
    const tenantId = this.tenantContext.getTenantId();
    return {
      tenantId,
      sms: { provider: 'twilio', enabled: true },
      email: { provider: 'sendgrid', enabled: true },
      push: { provider: 'firebase', enabled: false },
    };
  }
}
