import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1680000000000 implements MigrationInterface {
  name = 'InitialSchema1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE tenants (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name varchar(255) NOT NULL,
        createdAt timestamptz DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE user_accounts (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        email varchar(255) NOT NULL,
        passwordHash varchar(255) NOT NULL,
        role varchar(32) NOT NULL,
        externalId varchar(255),
        provider varchar(255),
        active boolean DEFAULT true,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz,
        CONSTRAINT uq_user_accounts UNIQUE (tenantId, email)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE students (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL,
        dateOfBirth date NOT NULL,
        admissionNumber varchar(255) NOT NULL,
        email varchar(255),
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE guardians (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(50),
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE staff_members (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        role varchar(32) NOT NULL,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE classrooms (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        name varchar(255) NOT NULL,
        gradeLevel varchar(255),
        homeroomTeacherId uuid,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE classroom_students (
        classroomId uuid NOT NULL,
        studentId uuid NOT NULL,
        PRIMARY KEY (classroomId, studentId)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE student_guardians (
        studentId uuid NOT NULL,
        guardianId uuid NOT NULL,
        PRIMARY KEY (studentId, guardianId)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE attendance_records (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        studentId uuid NOT NULL,
        classroomId uuid,
        date date NOT NULL,
        status varchar(32) NOT NULL,
        notes text,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE grades (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        studentId uuid NOT NULL,
        classroomId uuid,
        assessedById uuid,
        subject varchar(255) NOT NULL,
        score numeric(5,2) NOT NULL,
        comments text,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE fee_invoices (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        studentId uuid NOT NULL,
        description varchar(255) NOT NULL,
        amount numeric(10,2) NOT NULL,
        dueDate date NOT NULL,
        status varchar(32) NOT NULL,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
    await queryRunner.query(`
      CREATE TABLE announcements (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenantId uuid NOT NULL,
        title varchar(255) NOT NULL,
        content text NOT NULL,
        scheduledAt timestamptz,
        channels text,
        createdById uuid,
        createdAt timestamptz DEFAULT now(),
        updatedAt timestamptz DEFAULT now(),
        deletedAt timestamptz
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE announcements');
    await queryRunner.query('DROP TABLE fee_invoices');
    await queryRunner.query('DROP TABLE grades');
    await queryRunner.query('DROP TABLE attendance_records');
    await queryRunner.query('DROP TABLE student_guardians');
    await queryRunner.query('DROP TABLE classroom_students');
    await queryRunner.query('DROP TABLE classrooms');
    await queryRunner.query('DROP TABLE staff_members');
    await queryRunner.query('DROP TABLE guardians');
    await queryRunner.query('DROP TABLE students');
    await queryRunner.query('DROP TABLE user_accounts');
    await queryRunner.query('DROP TABLE tenants');
  }
}
