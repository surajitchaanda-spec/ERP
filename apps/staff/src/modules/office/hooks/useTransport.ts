import { useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface Route {
  id: string;
  name: string;
  driver: string;
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

export const useTransport = () => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState<Route[]>([{ id: 'route-1', name: 'Route 1', driver: 'Alice' }]);

  const updateDriver = (routeId: string, driver: string) => {
    if (!user) return;
    const api = clientFactory(user.token);
    setRoutes((prev) => prev.map((route) => (route.id === routeId ? { ...route, driver } : route)));
    api.patch(`/transport/routes/${routeId}`, { driver }).catch((error) => console.error('Failed to update driver', error));
  };

  return { routes, updateDriver };
};
