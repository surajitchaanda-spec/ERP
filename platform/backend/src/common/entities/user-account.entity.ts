import { Column, Entity, Unique } from 'typeorm';
import { TenantBaseEntity } from './tenant-base.entity';

export enum UserRole {
  PARENT = 'parent',
  STAFF = 'staff',
  PRINCIPAL = 'principal',
  ADMIN = 'admin',
}

@Entity({ name: 'user_accounts' })
@Unique(['email', 'tenantId'])
export class UserAccount extends TenantBaseEntity {
  @Column()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @Column({ nullable: true })
  externalId?: string;

  @Column({ nullable: true })
  provider?: string;

  @Column({ default: true })
  active!: boolean;
}
