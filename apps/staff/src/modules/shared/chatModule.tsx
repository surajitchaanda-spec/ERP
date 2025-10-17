import React, { useEffect, useState } from 'react';
import { ChatMessage, ChatService, MockPushProvider, createApiClient, useAuth } from '@erp/mobile-core';

const getChatService = (token: string) => new ChatService(createApiClient({ baseURL: 'https://api.example.com', getToken: () => token }));
const createId = () => Math.random().toString(36).slice(2);

export const ChatModule: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!user) return;
    const chat = getChatService(user.token);
    chat.fetchMessages('parent-thread').then((response) => setMessages(response.data));
    const pushProvider = new MockPushProvider();
    pushProvider.register().then((token) => console.info('Registered push token', token));
  }, [user]);

  const send = () => {
    if (!user || !input) return;
    const chat = getChatService(user.token);
    chat
      .sendMessage('parent-thread', input)
      .then(() =>
        setMessages((prev) => [
          ...prev,
          { id: createId(), from: user.id, to: 'parent', body: input, sentAt: new Date().toISOString() },
        ])
      )
      .finally(() => setInput(''));
  };

  return (
    <section>
      <h2>In-App Chat</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.from}: {message.body}
          </li>
        ))}
      </ul>
      <input value={input} onChange={(event) => setInput(event.target.value)} />
      <button onClick={send}>Send</button>
    </section>
  );
};
