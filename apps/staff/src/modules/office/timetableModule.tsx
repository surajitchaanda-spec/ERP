import React from 'react';
import { useTimetable } from './hooks/useTimetable';

export const TimetableModule: React.FC = () => {
  const { timetable, updateSlot } = useTimetable();

  return (
    <section>
      <h2>Timetable</h2>
      <ul>
        {timetable.map((slot) => (
          <li key={slot.id}>
            {slot.day} {slot.period}: {slot.subject}
            <button onClick={() => updateSlot(slot.id, { subject: 'Updated Subject' })}>Edit</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
