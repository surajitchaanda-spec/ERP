import { Column, Entity, ManyToMany } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';
import { Student } from './student.entity';

@Entity({ name: 'guardians' })
export class Guardian extends TenantBaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @ManyToMany(() => Student, (student) => student.guardians)
  students!: Student[];
}
