import { useAnnouncements, useChannelConfig } from '@/services/communications';

export function CommunicationsPage() {
  const { data: announcements } = useAnnouncements();
  const { data: config } = useChannelConfig();

  return (
    <div className="grid two">
      <section className="card">
        <h2>Recent Announcements</h2>
        <ul>
          {announcements?.map((announcement) => (
            <li key={announcement.id}>
              <strong>{announcement.title}</strong>
              <p>{announcement.content}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>Channel Configuration</h2>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </section>
    </div>
  );
}
