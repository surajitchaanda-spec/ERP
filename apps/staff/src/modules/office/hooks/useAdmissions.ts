import { useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface Application {
  id: string;
  studentName: string;
  status: 'pending' | 'approved';
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

export const useAdmissions = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([
    { id: 'app-1', studentName: 'Chris', status: 'pending' },
  ]);

  const approve = (id: string) => {
    if (!user) return;
    const api = clientFactory(user.token);
    setApplications((prev) => prev.map((application) => (application.id === id ? { ...application, status: 'approved' } : application)));
    api.patch(`/admissions/${id}`, { status: 'approved' }).catch((error) => console.error('Approve failed', error));
  };

  return { applications, approve };
};
