import React from 'react';
import { AttendanceModule } from './teacher/attendanceModule';
import { GradebookModule } from './teacher/gradebookModule';
import { ClassRosterModule } from './teacher/classRosterModule';
import { HomeworkModule } from './teacher/homeworkModule';
import { AnnouncementsModule } from './shared/announcementsModule';

export const TeacherDashboard: React.FC = () => (
  <div>
    <h1>Teacher Dashboard</h1>
    <ClassRosterModule />
    <AttendanceModule />
    <GradebookModule />
    <HomeworkModule />
    <AnnouncementsModule audience="class" />
  </div>
);
