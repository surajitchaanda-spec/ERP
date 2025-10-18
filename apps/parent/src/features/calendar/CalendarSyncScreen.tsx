import React, { useCallback, useState } from 'react';
import * as Calendar from 'expo-calendar';
import { Alert } from 'react-native';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export const CalendarSyncScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const [status, setStatus] = useState<string>('');
  const { data = [] } = useQuery<CalendarEvent[]>(
    ['calendar-events', activeStudentId],
    async () => {
      const { data: response } = await client.get<CalendarEvent[]>(
        `/students/${activeStudentId}/events`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  const requestPermission = useCallback(async () => {
    const { status: existingStatus } = await Calendar.requestCalendarPermissionsAsync();
    if (existingStatus !== 'granted') {
      Alert.alert(t('calendar.permissionDenied'));
      return false;
    }
    return true;
  }, [t]);

  const handleSync = useCallback(async () => {
    if (!activeStudentId) return;
    const granted = await requestPermission();
    if (!granted) return;
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars[0];
    for (const event of data) {
      await Calendar.createEventAsync(defaultCalendar.id, {
        title: `${t('calendar.prefix')} ${event.title}`,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        notes: event.description
      });
    }
    setStatus(t('calendar.syncComplete'));
  }, [activeStudentId, data, requestPermission, t]);

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('calendar.title')}
      </Text>
      <PrimaryButton onPress={handleSync} label={t('calendar.syncCta')} icon="calendar-sync" />
      {status ? <Text style={{ marginVertical: 8 }}>{status}</Text> : null}
      <List.Section>
        {data.map((event) => (
          <List.Item
            key={event.id}
            title={`${event.title} • ${event.startDate}`}
            description={event.description}
            left={(props) => <List.Icon {...props} icon="calendar" />}
          />
        ))}
      </List.Section>
    </ScreenContainer>
  );
};
