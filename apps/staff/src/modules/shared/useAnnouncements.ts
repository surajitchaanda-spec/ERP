import { useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface Announcement {
  id: string;
  message: string;
  audience: string;
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

const createId = () => Math.random().toString(36).slice(2);

export const useAnnouncements = (audience: string) => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const createAnnouncement = (message: string) => {
    if (!user) return;
    const api = clientFactory(user.token);
    const announcement: Announcement = { id: createId(), message, audience };
    setAnnouncements((prev) => [announcement, ...prev]);
    api.post('/announcements', announcement).catch((error) => console.error('Failed to post', error));
  };

  return { announcements, createAnnouncement };
};
