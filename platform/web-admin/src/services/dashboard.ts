import { useQuery } from '@tanstack/react-query';
import { apiClient } from './apiClient';

export interface KeyMetricsResponse {
  students: number;
  guardians: number;
  attendance: number;
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
}

export function useKeyMetrics() {
  return useQuery<KeyMetricsResponse>(['key-metrics'], async () => {
    const { data } = await apiClient.get('/reports/metrics');
    return data;
  });
}

export function useAttendanceTrends() {
  return useQuery<AttendanceTrend[]>(['attendance-trends'], async () => {
    const { data } = await apiClient.get('/reports/attendance');
    return data;
  });
}
