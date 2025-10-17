import 'react-native-gesture-handler';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/shared/api/queryClient';
import { theme } from './src/shared/ui/theme';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/features/auth/AuthContext';
import { StudentsProvider } from './src/features/students/StudentsContext';
import './src/shared/i18n/i18n';
import { AnalyticsProvider } from './src/shared/analytics/AnalyticsProvider';
import { NotificationsProvider } from './src/shared/notifications/NotificationsProvider';
import './src/shared/storage/queryPersist';

const App = () => (
  <AnalyticsProvider>
    <NotificationsProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <StudentsProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </StudentsProvider>
            </AuthProvider>
          </QueryClientProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </NotificationsProvider>
  </AnalyticsProvider>
);

export default App;
