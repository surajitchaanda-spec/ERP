import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../common/entities/student.entity';
import { Guardian } from '../../common/entities/guardian.entity';
import { AttendanceRecord } from '../../common/entities/attendance-record.entity';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Guardian)
    private readonly guardianRepository: Repository<Guardian>,
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRepository: Repository<AttendanceRecord>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async keyMetrics() {
    const tenantId = this.tenantContext.getTenantId();
    const [students, guardians, attendanceCount] = await Promise.all([
      this.studentRepository.count({ where: { tenantId } }),
      this.guardianRepository.count({ where: { tenantId } }),
      this.attendanceRepository.count({ where: { tenantId } }),
    ]);

    const attendanceRate = students > 0 ? Math.round((attendanceCount / students) * 100) : 0;

    return {
      students,
      guardians,
      attendance: Math.min(100, Math.max(0, attendanceRate)),
    };
  }

  async attendanceTrend() {
    const tenantId = this.tenantContext.getTenantId();
    const records = await this.attendanceRepository
      .createQueryBuilder('record')
      .select('record.date', 'date')
      .addSelect(`SUM(CASE WHEN record.status = 'present' THEN 1 ELSE 0 END)`, 'present')
      .addSelect(`SUM(CASE WHEN record.status = 'absent' THEN 1 ELSE 0 END)`, 'absent')
      .where('record.tenantId = :tenantId', { tenantId })
      .groupBy('record.date')
      .orderBy('record.date', 'ASC')
      .limit(14)
      .getRawMany();

    return records.map((r) => ({
      date: r.date,
      present: Number(r.present ?? 0),
      absent: Number(r.absent ?? 0),
    }));
  }
}
