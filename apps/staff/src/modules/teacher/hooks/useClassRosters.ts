import { useEffect, useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface Student {
  id: string;
  name: string;
}

interface ClassRoster {
  classId: string;
  className: string;
  students: Student[];
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

export const useClassRosters = () => {
  const { user } = useAuth();
  const [rosters, setRosters] = useState<ClassRoster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const api = clientFactory(user.token);
    api
      .get<ClassRoster[]>('/classes/rosters')
      .then((response) => setRosters(response.data))
      .finally(() => setIsLoading(false));
  }, [user]);

  return { rosters, isLoading };
};
