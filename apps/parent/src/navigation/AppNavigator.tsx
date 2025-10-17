import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../features/auth/AuthContext';
import { LoginScreen } from '../features/auth/LoginScreen';
import { LinkStudentScreen } from '../features/students/LinkStudentScreen';
import { DashboardScreen } from '../features/dashboard/DashboardScreen';
import { AttendanceScreen } from '../features/dashboard/AttendanceScreen';
import { TimetableScreen } from '../features/dashboard/TimetableScreen';
import { HomeworkScreen } from '../features/dashboard/HomeworkScreen';
import { GradesScreen } from '../features/dashboard/GradesScreen';
import { ExamsScreen } from '../features/dashboard/ExamsScreen';
import { FeesScreen } from '../features/fees/FeesScreen';
import { AnnouncementsScreen } from '../features/dashboard/AnnouncementsScreen';
import { MessagesScreen } from '../features/messaging/MessagesScreen';
import { SupportScreen } from '../features/support/SupportScreen';
import { CalendarSyncScreen } from '../features/calendar/CalendarSyncScreen';
import { useStudents } from '../features/students/StudentsContext';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: t('nav.dashboard') }} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} options={{ title: t('nav.attendance') }} />
      <Tab.Screen name="Timetable" component={TimetableScreen} options={{ title: t('nav.timetable') }} />
      <Tab.Screen name="Homework" component={HomeworkScreen} options={{ title: t('nav.homework') }} />
      <Tab.Screen name="Grades" component={GradesScreen} options={{ title: t('nav.grades') }} />
      <Tab.Screen name="Exams" component={ExamsScreen} options={{ title: t('nav.exams') }} />
      <Tab.Screen name="Fees" component={FeesScreen} options={{ title: t('nav.fees') }} />
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: t('nav.announcements') }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: t('nav.messages') }} />
      <Tab.Screen name="Calendar" component={CalendarSyncScreen} options={{ title: t('nav.calendar') }} />
      <Tab.Screen name="Support" component={SupportScreen} options={{ title: t('nav.support') }} />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { students, isLoading: studentsLoading } = useStudents();
  const { t } = useTranslation();

  if (isLoading || studentsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : students.length === 0 ? (
        <Stack.Screen
          name="LinkStudent"
          component={LinkStudentScreen}
          options={{ title: t('students.linkHeader') }}
        />
      ) : (
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};
