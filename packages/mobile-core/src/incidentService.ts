import { ApiClient } from './apiClient';

export interface IncidentReport {
  id: string;
  category: string;
  description: string;
  reportedAt: string;
  status: 'open' | 'in_progress' | 'closed';
}

export class IncidentService {
  constructor(private api: ApiClient) {}

  submitIncident(payload: Omit<IncidentReport, 'id' | 'status' | 'reportedAt'>) {
    return this.api.post('/incidents', payload);
  }

  listIncidents() {
    return this.api.get<IncidentReport[]>('/incidents');
  }
}
