import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord, AttendanceStatus } from '../../common/entities/attendance-record.entity';
import { Student } from '../../common/entities/student.entity';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRepository: Repository<AttendanceRecord>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly tenantContext: TenantContextService,
  ) {}

  findAll(page = 1, limit = 25) {
    const tenantId = this.tenantContext.getTenantId();
    return this.attendanceRepository.findAndCount({
      where: { tenantId },
      relations: ['student'],
      skip: (page - 1) * limit,
      take: limit,
      order: { date: 'DESC' },
    });
  }

  async markAttendance(
    studentId: string,
    status: AttendanceStatus,
    date: Date,
    notes?: string,
  ) {
    const tenantId = this.tenantContext.getTenantId();
    const student = await this.studentRepository.findOne({ where: { id: studentId, tenantId } });
    if (!student) {
      throw new Error('Student not found for tenant');
    }
    const record = this.attendanceRepository.create({
      student,
      tenantId,
      status,
      date,
      notes,
    });
    return this.attendanceRepository.save(record);
  }
}
