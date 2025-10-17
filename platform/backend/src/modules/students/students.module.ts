import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student } from '../../common/entities/student.entity';
import { Guardian } from '../../common/entities/guardian.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Guardian]), TenancyModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
