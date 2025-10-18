import React, { createContext, useContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { client } from '../api/client';
import { AuthContext } from '../../features/auth/AuthContext';

interface NotificationsContextValue {
  requestPermissions: () => Promise<boolean>;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('NotificationsProvider must be rendered within AuthProvider.');
    }
    return <>{children}</>;
  }

  const { user } = auth;

  useEffect(() => {
    const register = async () => {
      if (!user) return;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
      const token = await Notifications.getExpoPushTokenAsync({
        projectId
      });
      await client.post('/notifications/register', {
        token: token.data,
        platform: Platform.OS
      });
    };
    register();
  }, [user]);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  };

  return <NotificationsContext.Provider value={{ requestPermissions }}>{children}</NotificationsContext.Provider>;
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return context;
};
