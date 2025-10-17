import React from 'react';
import { useGradebook } from './hooks/useGradebook';

export const GradebookModule: React.FC = () => {
  const { gradebook, updateGrade, sync, hasConflicts } = useGradebook();

  return (
    <section>
      <h2>Gradebook</h2>
      {gradebook.map((entry) => (
        <div key={entry.assignmentId}>
          <h3>{entry.assignmentName}</h3>
          <ul>
            {entry.grades.map((grade) => (
              <li key={grade.studentId}>
                {grade.studentName}: {grade.score}
                <button onClick={() => updateGrade(entry.assignmentId, grade.studentId, grade.score + 1)}>+1</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {hasConflicts && <p>Conflicts detected. Please resolve before syncing.</p>}
      <button onClick={sync}>Sync Grades</button>
    </section>
  );
};
