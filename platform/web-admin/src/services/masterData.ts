import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface GuardianSummary {
  id: string;
  firstName: string;
  lastName: string;
}

export interface StudentSummary {
  id: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  guardians: GuardianSummary[];
}

export function useStudents() {
  return useQuery<StudentSummary[]>(['students'], async () => {
    const { data } = await apiClient.get('/students');
    return data.items ?? data;
  });
}
