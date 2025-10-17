import React from 'react';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
}

export const AnnouncementsScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<AnnouncementItem[]>(
    ['announcements', activeStudentId],
    async () => {
      const { data: response } = await client.get<AnnouncementItem[]>(
        `/students/${activeStudentId}/announcements`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('announcements.title')}
      </Text>
      <List.Section>
        {data.map((item) => (
          <List.Item
            key={item.id}
            title={item.title}
            description={`${item.summary}\n${t('announcements.publishedAt', { date: item.publishedAt })}`}
            left={(props) => <List.Icon {...props} icon="bullhorn" />}
          />
        ))}
      </List.Section>
    </ScreenContainer>
  );
};
