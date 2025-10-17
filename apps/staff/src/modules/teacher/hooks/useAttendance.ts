import { useEffect, useState } from 'react';
import { OfflineRecord } from '@erp/mobile-core';

interface AttendanceRecord {
  id: string;
  classId: string;
  studentId: string;
  status: 'present' | 'absent';
  updatedAt: number;
}

export const useAttendance = () => {
  const [records, setRecords] = useState<OfflineRecord<AttendanceRecord>[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setRecords([
      {
        id: '1',
        data: { id: '1', classId: 'math-101', studentId: 'stu-1', status: 'present', updatedAt: Date.now() },
        status: 'pending',
        updatedAt: Date.now(),
      },
    ]);
    setIsOffline(!navigator.onLine);
  }, []);

  const submit = () => {
    if (isOffline) {
      console.warn('Cannot sync while offline');
      return;
    }
    console.info('Submitting attendance payload', records);
  };

  return { records, submit, isOffline };
};
