import React from 'react';
import { DataTable, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface GradeRecord {
  id: string;
  subject: string;
  exam: string;
  score: number;
  maxScore: number;
}

export const GradesScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<GradeRecord[]>(
    ['grades', activeStudentId],
    async () => {
      const { data: response } = await client.get<GradeRecord[]>(
        `/students/${activeStudentId}/grades`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('grades.title')}
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t('grades.subject')}</DataTable.Title>
          <DataTable.Title>{t('grades.exam')}</DataTable.Title>
          <DataTable.Title numeric>{t('grades.score')}</DataTable.Title>
        </DataTable.Header>
        {data.map((grade) => (
          <DataTable.Row key={grade.id}>
            <DataTable.Cell>{grade.subject}</DataTable.Cell>
            <DataTable.Cell>{grade.exam}</DataTable.Cell>
            <DataTable.Cell numeric>
              {grade.score}/{grade.maxScore}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScreenContainer>
  );
};
