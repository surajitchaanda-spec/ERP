import React from 'react';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface TimetableEntry {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  teacher: string;
}

export const TimetableScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<TimetableEntry[]>(
    ['timetable', activeStudentId],
    async () => {
      const { data: response } = await client.get<TimetableEntry[]>(
        `/students/${activeStudentId}/timetable/today`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('timetable.title')}
      </Text>
      <List.Section>
        {data.map((entry) => (
          <List.Item
            key={entry.id}
            title={`${entry.subject} ${entry.startTime} - ${entry.endTime}`}
            description={`${t('timetable.teacher')}: ${entry.teacher}`}
            left={(props) => <List.Icon {...props} icon="clock-outline" />}
          />
        ))}
      </List.Section>
    </ScreenContainer>
  );
};
