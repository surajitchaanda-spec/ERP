import React from 'react';
import { useClassRosters } from './hooks/useClassRosters';

export const ClassRosterModule: React.FC = () => {
  const { rosters, isLoading } = useClassRosters();

  if (isLoading) {
    return <section>Loading class rosters...</section>;
  }

  return (
    <section>
      <h2>Class Rosters</h2>
      {rosters.map((roster) => (
        <div key={roster.classId}>
          <h3>{roster.className}</h3>
          <ul>
            {roster.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
