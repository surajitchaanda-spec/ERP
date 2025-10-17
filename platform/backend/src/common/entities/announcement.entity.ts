import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { StaffMember } from './staff-member.entity';

@Entity({ name: 'announcements' })
export class Announcement extends TenantBaseEntity {
  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt?: Date;

  @Column({ type: 'simple-array', nullable: true })
  channels?: string[];

  @ManyToOne(() => StaffMember, (staff) => staff.announcements, {
    nullable: true,
  })
  @JoinColumn({ name: 'createdById' })
  createdBy?: StaffMember;
}
