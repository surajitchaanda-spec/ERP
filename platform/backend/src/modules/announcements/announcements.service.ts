import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from '../../common/entities/announcement.entity';
import { StaffMember } from '../../common/entities/staff-member.entity';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementsRepository: Repository<Announcement>,
    @InjectRepository(StaffMember)
    private readonly staffRepository: Repository<StaffMember>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async list(page = 1, limit = 25) {
    const tenantId = this.tenantContext.getTenantId();
    const [announcements, total] = await this.announcementsRepository.findAndCount({
      where: { tenantId },
      relations: ['createdBy'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { announcements, total, page, limit };
  }

  async create(data: { title: string; content: string; scheduledAt?: Date; channels?: string[]; staffId?: string }) {
    const tenantId = this.tenantContext.getTenantId();
    let staff: StaffMember | null = null;
    if (data.staffId) {
      staff = await this.staffRepository.findOne({ where: { id: data.staffId, tenantId } });
    }
    const announcement = this.announcementsRepository.create({
      tenantId,
      title: data.title,
      content: data.content,
      scheduledAt: data.scheduledAt,
      channels: data.channels,
      createdBy: staff ?? undefined,
    });
    return this.announcementsRepository.save(announcement);
  }
}
