import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  TARDY = 'tardy',
}

@Entity({ name: 'attendance_records' })
export class AttendanceRecord extends TenantBaseEntity {
  @ManyToOne(() => Student, (student) => student.attendanceRecords)
  @JoinColumn({ name: 'studentId' })
  student!: Student;

  @ManyToOne(() => Classroom, { nullable: true })
  @JoinColumn({ name: 'classroomId' })
  classroom?: Classroom;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status!: AttendanceStatus;

  @Column({ nullable: true })
  notes?: string;
}
