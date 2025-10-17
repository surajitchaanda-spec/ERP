import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade } from '../../common/entities/grade.entity';
import { Student } from '../../common/entities/student.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student]), TenancyModule],
  providers: [GradesService],
  controllers: [GradesController],
})
export class GradesModule {}
