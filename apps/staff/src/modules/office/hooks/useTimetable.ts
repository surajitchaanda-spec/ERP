import { useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface TimetableSlot {
  id: string;
  day: string;
  period: string;
  subject: string;
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

export const useTimetable = () => {
  const { user } = useAuth();
  const [timetable, setTimetable] = useState<TimetableSlot[]>([
    { id: 'slot-1', day: 'Monday', period: '1', subject: 'Math' },
  ]);

  const updateSlot = (id: string, updates: Partial<TimetableSlot>) => {
    if (!user) return;
    const api = clientFactory(user.token);
    setTimetable((prev) => prev.map((slot) => (slot.id === id ? { ...slot, ...updates } : slot)));
    api.patch(`/timetable/${id}`, updates).catch((error) => console.error('Failed to update timetable', error));
  };

  return { timetable, updateSlot };
};
