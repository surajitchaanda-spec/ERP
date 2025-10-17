import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../common/entities/student.entity';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async list(page = 1, limit = 25) {
    const tenantId = this.tenantContext.getTenantId();
    const [items, total] = await this.studentRepository.findAndCount({
      where: { tenantId },
      relations: ['guardians'],
      skip: (page - 1) * limit,
      take: limit,
      order: { lastName: 'ASC' },
    });
    return { items, total, page, limit };
  }
}
