import { NavLink } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import './AppLayout.css';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>ERP Admin</h1>
        <nav>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/master-data">Master Data</NavLink>
          <NavLink to="/communications">Comms & Channels</NavLink>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
