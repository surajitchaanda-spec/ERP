import React from 'react';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface ExamItem {
  id: string;
  subject: string;
  date: string;
  venue: string;
}

export const ExamsScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<ExamItem[]>(
    ['exams', activeStudentId],
    async () => {
      const { data: response } = await client.get<ExamItem[]>(
        `/students/${activeStudentId}/exams`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('exams.title')}
      </Text>
      <List.Section>
        {data.map((exam) => (
          <List.Item
            key={exam.id}
            title={`${exam.subject} • ${exam.date}`}
            description={`${t('exams.venue')}: ${exam.venue}`}
            left={(props) => <List.Icon {...props} icon="calendar" />}
          />
        ))}
      </List.Section>
    </ScreenContainer>
  );
};
