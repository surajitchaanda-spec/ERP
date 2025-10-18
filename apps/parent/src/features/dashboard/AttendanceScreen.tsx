import React from 'react';
import { DataTable, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface AttendanceRecord {
  date: string;
  status: string;
}

export const AttendanceScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<AttendanceRecord[]>(
    ['attendance-records', activeStudentId],
    async () => {
      const { data: response } = await client.get<AttendanceRecord[]>(
        `/students/${activeStudentId}/attendance`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('attendance.title')}
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t('attendance.date')}</DataTable.Title>
          <DataTable.Title>{t('attendance.status')}</DataTable.Title>
        </DataTable.Header>
        {data.map((record) => (
          <DataTable.Row key={record.date}>
            <DataTable.Cell>{record.date}</DataTable.Cell>
            <DataTable.Cell>{record.status}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScreenContainer>
  );
};
