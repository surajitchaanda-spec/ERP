import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';

interface AttendanceSummary {
  percentage: number;
  status: string;
}

interface HomeworkSummary {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
}

interface AnnouncementSummary {
  id: string;
  title: string;
  summary: string;
}

export const useStudentData = (studentId: string | null) => {
  const { data: attendance } = useQuery<AttendanceSummary>(
    ['attendance', studentId],
    async () => {
      const { data } = await client.get<AttendanceSummary>(
        `/students/${studentId}/attendance/summary`
      );
      return data;
    },
    { enabled: Boolean(studentId) }
  );

  const { data: homeworkDueToday = [] } = useQuery<HomeworkSummary[]>(
    ['homework-today', studentId],
    async () => {
      const { data } = await client.get<HomeworkSummary[]>(
        `/students/${studentId}/homework?scope=today`
      );
      return data;
    },
    { enabled: Boolean(studentId) }
  );

  const { data: announcements = [] } = useQuery<AnnouncementSummary[]>(
    ['announcements', studentId],
    async () => {
      const { data } = await client.get<AnnouncementSummary[]>(
        `/students/${studentId}/announcements`
      );
      return data;
    },
    { enabled: Boolean(studentId) }
  );

  return { attendance, homeworkDueToday, announcements };
};
