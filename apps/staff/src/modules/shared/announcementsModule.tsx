import React, { useState } from 'react';
import { useAnnouncements } from './useAnnouncements';

interface Props {
  audience: 'class' | 'school';
}

export const AnnouncementsModule: React.FC<Props> = ({ audience }) => {
  const { announcements, createAnnouncement } = useAnnouncements(audience);
  const [message, setMessage] = useState('');

  return (
    <section>
      <h2>Announcements</h2>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>{announcement.message}</li>
        ))}
      </ul>
      <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      <button
        onClick={() => {
          createAnnouncement(message);
          setMessage('');
        }}
      >
        Post Announcement
      </button>
    </section>
  );
};
