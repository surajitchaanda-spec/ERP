import React, { useMemo } from 'react';
import { OfflineStore } from '@erp/mobile-core';
import { useAttendance } from './hooks/useAttendance';

export const AttendanceModule: React.FC = () => {
  const { records, submit, isOffline } = useAttendance();
  const offlineSummary = useMemo(() => {
    const store = new OfflineStore(records.map((record) => ({ ...record, status: 'pending' as const })));
    const pending = store.list('pending').length;
    const conflicts = store.list('conflict').length;
    return { pending, conflicts };
  }, [records]);

  return (
    <section>
      <h2>Attendance</h2>
      {isOffline && <p>You are offline. Pending sync: {offlineSummary.pending}. Conflicts: {offlineSummary.conflicts}</p>}
      <button onClick={submit}>Sync Attendance</button>
    </section>
  );
};
