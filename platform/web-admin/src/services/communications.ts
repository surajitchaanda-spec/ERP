import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface AnnouncementSummary {
  id: string;
  title: string;
  content: string;
}

export interface ChannelConfig {
  sms: { provider: string; enabled: boolean };
  email: { provider: string; enabled: boolean };
  push: { provider: string; enabled: boolean };
}

export function useAnnouncements() {
  return useQuery<AnnouncementSummary[]>(['announcements'], async () => {
    const { data } = await apiClient.get('/announcements');
    return data.announcements ?? data;
  });
}

export function useChannelConfig() {
  return useQuery<ChannelConfig>(['channel-config'], async () => {
    const { data } = await apiClient.get('/messaging/config');
    return data;
  });
}
