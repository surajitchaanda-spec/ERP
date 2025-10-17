import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeeInvoice, FeeStatus } from '../../common/entities/fee-invoice.entity';
import { Student } from '../../common/entities/student.entity';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(FeeInvoice)
    private readonly feeRepository: Repository<FeeInvoice>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async list(status?: FeeStatus, page = 1, limit = 25) {
    const tenantId = this.tenantContext.getTenantId();
    const where = { tenantId, ...(status ? { status } : {}) };
    const [invoices, total] = await this.feeRepository.findAndCount({
      where,
      relations: ['student'],
      skip: (page - 1) * limit,
      take: limit,
      order: { dueDate: 'DESC' },
    });
    return { invoices, total, page, limit };
  }

  async createInvoice(studentId: string, description: string, amount: number, dueDate: Date) {
    const tenantId = this.tenantContext.getTenantId();
    const student = await this.studentRepository.findOne({ where: { id: studentId, tenantId } });
    if (!student) {
      throw new Error('Student not found');
    }
    const invoice = this.feeRepository.create({
      tenantId,
      student,
      description,
      amount,
      dueDate,
      status: FeeStatus.PENDING,
    });
    return this.feeRepository.save(invoice);
  }

  async updateStatus(invoiceId: string, status: FeeStatus) {
    const tenantId = this.tenantContext.getTenantId();
    await this.feeRepository.update({ id: invoiceId, tenantId }, { status });
    return this.feeRepository.findOne({ where: { id: invoiceId, tenantId } });
  }
}
