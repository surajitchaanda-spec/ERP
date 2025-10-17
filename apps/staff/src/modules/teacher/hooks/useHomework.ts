import { useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface HomeworkAssignment {
  id: string;
  title: string;
  dueDate: string;
  classId: string;
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

const createId = () => Math.random().toString(36).slice(2);

export const useHomework = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<HomeworkAssignment[]>([]);

  const createAssignment = (input: Omit<HomeworkAssignment, 'id'>) => {
    if (!user) return;
    const api = clientFactory(user.token);
    const assignment: HomeworkAssignment = { id: createId(), ...input };
    setAssignments((prev) => [...prev, assignment]);
    api.post('/homework', assignment).catch((error) => {
      console.error('Failed to create assignment', error);
    });
  };

  return { assignments, createAssignment };
};
