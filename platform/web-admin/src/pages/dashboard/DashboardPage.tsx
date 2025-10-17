import { useAttendanceTrends, useKeyMetrics } from '@/services/dashboard';
import { MetricCard } from '@/components/charts/MetricCard';
import { useMemo } from 'react';

export function DashboardPage() {
  const { data: metrics } = useKeyMetrics();
  const { data: attendance } = useAttendanceTrends();

  const trendSummary = useMemo(() => {
    if (!attendance?.length) {
      return 'No attendance submissions this week.';
    }
    const latest = attendance[attendance.length - 1];
    return `Latest attendance: ${latest.present}% present, ${latest.absent}% absent.`;
  }, [attendance]);

  return (
    <div className="grid three">
      <MetricCard title="Active Students" value={metrics?.students ?? 0} subtitle="Across all tenants" />
      <MetricCard title="Guardians" value={metrics?.guardians ?? 0} subtitle="Connected contacts" />
      <MetricCard title="Attendance" value={`${metrics?.attendance ?? 0}%`} subtitle={trendSummary} />
    </div>
  );
}
