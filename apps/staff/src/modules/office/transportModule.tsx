import React from 'react';
import { useTransport } from './hooks/useTransport';

export const TransportModule: React.FC = () => {
  const { routes, updateDriver } = useTransport();

  return (
    <section>
      <h2>Transport</h2>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            {route.name} - Driver: {route.driver}
            <button onClick={() => updateDriver(route.id, 'New Driver')}>Assign Driver</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
