import React from 'react';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { DataCard } from '../../shared/ui/DataCard';
import { StudentSwitcher } from '../students/StudentSwitcher';
import { useStudents } from '../students/StudentsContext';
import { useStudentData } from './useStudentData';
import { useTranslation } from 'react-i18next';

export const DashboardScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { attendance, homeworkDueToday, announcements } = useStudentData(activeStudentId);
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('dashboard.title')}
      </Text>
      <StudentSwitcher />
      <DataCard title={t('dashboard.attendanceTitle')} description={t('dashboard.attendanceDesc')}>
        <Text variant="displaySmall">{attendance?.percentage ?? '--'}%</Text>
        <Text variant="bodyMedium">{attendance?.status ?? t('dashboard.attendancePending')}</Text>
      </DataCard>
      <DataCard title={t('dashboard.homeworkTitle')} description={t('dashboard.homeworkDesc')}>
        {homeworkDueToday.length === 0 ? (
          <Text>{t('dashboard.noHomework')}</Text>
        ) : (
          <List.Section>
            {homeworkDueToday.map((hw) => (
              <List.Item key={hw.id} title={hw.subject} description={hw.title} left={(props) => <List.Icon {...props} icon="book" />} />
            ))}
          </List.Section>
        )}
      </DataCard>
      <DataCard title={t('dashboard.announcementsTitle')}>
        {announcements.length === 0 ? (
          <Text>{t('dashboard.noAnnouncements')}</Text>
        ) : (
          <List.Section>
            {announcements.map((item) => (
              <List.Item key={item.id} title={item.title} description={item.summary} left={(props) => <List.Icon {...props} icon="bullhorn" />} />
            ))}
          </List.Section>
        )}
      </DataCard>
    </ScreenContainer>
  );
};
