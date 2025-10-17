import AppDataSource from '../data-source';
import { UserAccount, UserRole } from '../../common/entities/user-account.entity';
import { Student } from '../../common/entities/student.entity';
import { Guardian } from '../../common/entities/guardian.entity';
import { StaffMember, StaffRole } from '../../common/entities/staff-member.entity';
import { Classroom } from '../../common/entities/classroom.entity';
import { AttendanceRecord, AttendanceStatus } from '../../common/entities/attendance-record.entity';
import { Grade } from '../../common/entities/grade.entity';
import { FeeInvoice, FeeStatus } from '../../common/entities/fee-invoice.entity';
import { Announcement } from '../../common/entities/announcement.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();
  const tenantId = '00000000-0000-0000-0000-000000000001';
  const userRepository = AppDataSource.getRepository(UserAccount);
  const existing = await userRepository.findOne({ where: { email: 'admin@demo.local', tenantId } });
  if (!existing) {
    const admin = userRepository.create({
      tenantId,
      email: 'admin@demo.local',
      passwordHash: await bcrypt.hash('ChangeMe123!', 10),
      role: UserRole.ADMIN,
    });
    await userRepository.save(admin);
  }

  const studentRepository = AppDataSource.getRepository(Student);
  const guardianRepository = AppDataSource.getRepository(Guardian);
  const staffRepository = AppDataSource.getRepository(StaffMember);
  const classroomRepository = AppDataSource.getRepository(Classroom);
  const attendanceRepository = AppDataSource.getRepository(AttendanceRecord);
  const gradeRepository = AppDataSource.getRepository(Grade);
  const feeRepository = AppDataSource.getRepository(FeeInvoice);
  const announcementRepository = AppDataSource.getRepository(Announcement);

  const guardian = guardianRepository.create({
    tenantId,
    firstName: 'Alex',
    lastName: 'Parent',
    email: 'alex.parent@example.com',
  });
  await guardianRepository.save(guardian);

  const student = studentRepository.create({
    tenantId,
    firstName: 'Jamie',
    lastName: 'Student',
    dateOfBirth: new Date('2010-09-01'),
    admissionNumber: 'ADM-1001',
    guardians: [guardian],
  });
  await studentRepository.save(student);

  const teacher = staffRepository.create({
    tenantId,
    firstName: 'Taylor',
    lastName: 'Teacher',
    email: 'taylor.teacher@example.com',
    role: StaffRole.TEACHER,
  });
  await staffRepository.save(teacher);

  const classroom = classroomRepository.create({
    tenantId,
    name: 'Grade 6 - A',
    gradeLevel: 'Grade 6',
    homeroomTeacher: teacher,
    students: [student],
  });
  await classroomRepository.save(classroom);

  const attendance = attendanceRepository.create({
    tenantId,
    student,
    classroom,
    date: new Date(),
    status: AttendanceStatus.PRESENT,
  });
  await attendanceRepository.save(attendance);

  const grade = gradeRepository.create({
    tenantId,
    student,
    classroom,
    subject: 'Mathematics',
    score: 95,
  });
  await gradeRepository.save(grade);

  const invoice = feeRepository.create({
    tenantId,
    student,
    description: 'Tuition Fee - Term 1',
    amount: 2500,
    dueDate: new Date(),
    status: FeeStatus.PENDING,
  });
  await feeRepository.save(invoice);

  const announcement = announcementRepository.create({
    tenantId,
    title: 'Welcome Back!',
    content: 'We are excited to start the new school year.',
    channels: ['email', 'push'],
    createdBy: teacher,
  });
  await announcementRepository.save(announcement);

  await AppDataSource.destroy();
}

seed()
  .then(() => {
    console.log('Seed data successfully inserted.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed data', error);
    process.exit(1);
  });
