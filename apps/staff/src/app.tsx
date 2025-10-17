import React from 'react';
import { AuthProvider, useAuth } from '@erp/mobile-core';
import { TeacherDashboard } from './modules/teacherDashboard';
import { OfficeDashboard } from './modules/officeDashboard';

const RoleRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in.</div>;
  }

  switch (user.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'office':
      return <OfficeDashboard />;
    default:
      return <div>Role not supported.</div>;
  }
};

export const App: React.FC = () => (
  <AuthProvider>
    <RoleRouter />
  </AuthProvider>
);
