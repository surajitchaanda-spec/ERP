import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { Guardian } from './guardian.entity';
import { AttendanceRecord } from './attendance-record.entity';
import { Grade } from './grade.entity';

@Entity({ name: 'students' })
export class Student extends TenantBaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ unique: true })
  admissionNumber!: string;

  @Column({ nullable: true })
  email?: string;

  @ManyToMany(() => Guardian, (guardian) => guardian.students, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'student_guardians',
    joinColumn: { name: 'studentId' },
    inverseJoinColumn: { name: 'guardianId' },
  })
  guardians!: Guardian[];

  @OneToMany(() => AttendanceRecord, (record) => record.student)
  attendanceRecords!: AttendanceRecord[];

  @OneToMany(() => Grade, (grade) => grade.student)
  grades!: Grade[];
}
