import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IconButton, List, TextInput } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { client } from '../../shared/api/client';
import { useTranslation } from 'react-i18next';

interface MessageItem {
  id: string;
  sender: string;
  body: string;
  sentAt: string;
}

export const MessagesScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const { data = [] } = useQuery<MessageItem[]>(
    ['messages', activeStudentId],
    async () => {
      const { data: response } = await client.get<MessageItem[]>(
        `/students/${activeStudentId}/messages`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  const { mutateAsync, isLoading } = useMutation(
    async () => {
      await client.post(`/students/${activeStudentId}/messages`, { body: message });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['messages', activeStudentId]);
        setMessage('');
      }
    }
  );

  return (
    <ScreenContainer scrollable={false}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.sender}
            description={`${item.body}\n${item.sentAt}`}
            left={(props) => <List.Icon {...props} icon="message" />}
          />
        )}
      />
      <TextInput
        placeholder={t('messages.placeholder')}
        value={message}
        onChangeText={setMessage}
        multiline
        style={styles.input}
      />
      <IconButton
        icon="send"
        onPress={() => mutateAsync()}
        disabled={!message.trim() || isLoading}
        style={styles.sendButton}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 16,
    marginBottom: 8
  },
  sendButton: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: 16
  }
});
