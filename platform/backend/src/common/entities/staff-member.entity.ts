import { Column, Entity, OneToMany } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { Classroom } from './classroom.entity';
import { Announcement } from './announcement.entity';

export enum StaffRole {
  TEACHER = 'teacher',
  PRINCIPAL = 'principal',
  ADMIN = 'admin',
  SUPPORT = 'support',
}

@Entity({ name: 'staff_members' })
export class StaffMember extends TenantBaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: StaffRole;

  @OneToMany(() => Classroom, (classroom) => classroom.homeroomTeacher)
  classrooms!: Classroom[];

  @OneToMany(() => Announcement, (announcement) => announcement.createdBy)
  announcements!: Announcement[];
}
