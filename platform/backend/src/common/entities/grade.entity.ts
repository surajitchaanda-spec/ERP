import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';
import { StaffMember } from './staff-member.entity';

@Entity({ name: 'grades' })
export class Grade extends TenantBaseEntity {
  @ManyToOne(() => Student, (student) => student.grades)
  @JoinColumn({ name: 'studentId' })
  student!: Student;

  @ManyToOne(() => Classroom, { nullable: true })
  @JoinColumn({ name: 'classroomId' })
  classroom?: Classroom;

  @ManyToOne(() => StaffMember, { nullable: true })
  @JoinColumn({ name: 'assessedById' })
  assessedBy?: StaffMember;

  @Column()
  subject!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score!: number;

  @Column({ nullable: true })
  comments?: string;
}
