import { Column, Entity, ManyToMany, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { StaffMember } from './staff-member.entity';
import { Student } from './student.entity';

@Entity({ name: 'classrooms' })
export class Classroom extends TenantBaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  gradeLevel?: string;

  @ManyToOne(() => StaffMember, (staff) => staff.classrooms, {
    nullable: true,
  })
  @JoinColumn({ name: 'homeroomTeacherId' })
  homeroomTeacher?: StaffMember;

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'classroom_students',
    joinColumn: { name: 'classroomId' },
    inverseJoinColumn: { name: 'studentId' },
  })
  students!: Student[];
}
