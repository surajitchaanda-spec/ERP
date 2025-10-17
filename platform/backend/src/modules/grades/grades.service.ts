import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../../common/entities/grade.entity';
import { Student } from '../../common/entities/student.entity';
import { TenantContextService } from '../../tenancy/tenant-context.service';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradesRepository: Repository<Grade>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async findAll(filters: { subject?: string; studentId?: string }, page = 1, limit = 25) {
    const tenantId = this.tenantContext.getTenantId();
    const query = this.gradesRepository
      .createQueryBuilder('grade')
      .leftJoinAndSelect('grade.student', 'student')
      .where('grade.tenantId = :tenantId', { tenantId });

    if (filters.subject) {
      query.andWhere('grade.subject = :subject', { subject: filters.subject });
    }
    if (filters.studentId) {
      query.andWhere('grade.studentId = :studentId', { studentId: filters.studentId });
    }

    const [grades, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('grade.createdAt', 'DESC')
      .getManyAndCount();

    return { grades, total, page, limit };
  }

  async recordGrade(
    studentId: string,
    subject: string,
    score: number,
    comments?: string,
  ) {
    const tenantId = this.tenantContext.getTenantId();
    const student = await this.studentsRepository.findOne({ where: { id: studentId, tenantId } });
    if (!student) {
      throw new Error('Student not found for tenant');
    }
    const grade = this.gradesRepository.create({
      tenantId,
      student,
      subject,
      score,
      comments,
    });
    return this.gradesRepository.save(grade);
  }
}
