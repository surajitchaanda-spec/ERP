import { ApiClient } from './apiClient';

export interface ChatMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  sentAt: string;
}

export class ChatService {
  constructor(private api: ApiClient) {}

  listThreads(role: string) {
    return this.api.get(`/chat/threads?role=${role}`);
  }

  fetchMessages(threadId: string) {
    return this.api.get(`/chat/threads/${threadId}/messages`);
  }

  sendMessage(threadId: string, body: string) {
    return this.api.post(`/chat/threads/${threadId}/messages`, { body });
  }
}
