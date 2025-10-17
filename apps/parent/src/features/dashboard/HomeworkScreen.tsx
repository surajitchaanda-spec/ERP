import React from 'react';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
}

export const HomeworkScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<HomeworkItem[]>(
    ['homework', activeStudentId],
    async () => {
      const { data: response } = await client.get<HomeworkItem[]>(
        `/students/${activeStudentId}/homework`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('homework.title')}
      </Text>
      <List.Section>
        {data.map((item) => (
          <List.Item
            key={item.id}
            title={item.title}
            description={`${item.subject} • ${t('homework.dueDate', { date: item.dueDate })}`}
            left={(props) => <List.Icon {...props} icon={item.completed ? 'check-circle-outline' : 'book'} />}
          />
        ))}
      </List.Section>
    </ScreenContainer>
  );
};
