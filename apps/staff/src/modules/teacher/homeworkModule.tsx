import React, { useState } from 'react';
import { useHomework } from './hooks/useHomework';

export const HomeworkModule: React.FC = () => {
  const { assignments, createAssignment } = useHomework();
  const [title, setTitle] = useState('');

  return (
    <section>
      <h2>Homework</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            {assignment.title} - due {assignment.dueDate}
          </li>
        ))}
      </ul>
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Assignment title" />
      <button
        onClick={() => {
          createAssignment({ title, dueDate: new Date().toISOString(), classId: 'math-101' });
          setTitle('');
        }}
      >
        Create Assignment
      </button>
    </section>
  );
};
