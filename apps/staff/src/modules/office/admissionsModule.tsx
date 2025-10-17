import React from 'react';
import { useAdmissions } from './hooks/useAdmissions';

export const AdmissionsModule: React.FC = () => {
  const { applications, approve } = useAdmissions();

  return (
    <section>
      <h2>Admissions</h2>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            {application.studentName} - {application.status}
            {application.status === 'pending' && <button onClick={() => approve(application.id)}>Approve</button>}
          </li>
        ))}
      </ul>
    </section>
  );
};
