import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { client } from '../../shared/api/client';
import { useAuth } from '../auth/AuthContext';
import { useAnalytics } from '../../shared/analytics/useAnalytics';

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  avatarUrl?: string;
}

interface StudentsContextValue {
  students: StudentProfile[];
  activeStudentId: string | null;
  isLoading: boolean;
  setActiveStudent: (studentId: string) => void;
  linkStudent: (invitationCode: string) => Promise<void>;
}

const StudentsContext = createContext<StudentsContextValue | undefined>(undefined);

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const analytics = useAnalytics();

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setStudents([]);
        setActiveStudentId(null);
        return;
      }
      setIsLoading(true);
      try {
        const { data } = await client.get<StudentProfile[]>('/parents/students');
        setStudents(data);
        if (data.length > 0) {
          setActiveStudentId(data[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [user]);

  const setActiveStudent = (studentId: string) => {
    setActiveStudentId(studentId);
    analytics.track('student_switched', { studentId });
  };

  const linkStudent = async (invitationCode: string) => {
    setIsLoading(true);
    try {
      const { data } = await client.post<StudentProfile>('/parents/students/link', {
        invitationCode
      });
      setStudents((prev) => [...prev, data]);
      setActiveStudentId(data.id);
      analytics.track('student_linked', { studentId: data.id });
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({ students, activeStudentId, isLoading, setActiveStudent, linkStudent }),
    [students, activeStudentId, isLoading]
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
};

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error('useStudents must be used within StudentsProvider');
  }
  return context;
};
