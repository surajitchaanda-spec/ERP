import React, { useState } from 'react';
import { createApiClient, IncidentService, useAuth } from '@erp/mobile-core';

const getIncidentService = (token: string) => new IncidentService(createApiClient({ baseURL: 'https://api.example.com', getToken: () => token }));

export const IncidentModule: React.FC = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const submit = async () => {
    if (!user) return;
    const service = getIncidentService(user.token);
    setStatus('Submitting...');
    try {
      await service.submitIncident({ category: 'safety', description });
      setStatus('Incident submitted');
    } catch (error) {
      console.error(error);
      setStatus('Submission failed');
    }
  };

  return (
    <section>
      <h2>Incident Reporting</h2>
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      <button onClick={submit}>Submit Incident</button>
      <p>{status}</p>
    </section>
  );
};
