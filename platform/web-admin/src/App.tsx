import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { MasterDataPage } from './pages/master-data/MasterDataPage';
import { CommunicationsPage } from './pages/communications/CommunicationsPage';
import { AppLayout } from './components/layout/AppLayout';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/master-data" element={<MasterDataPage />} />
        <Route path="/communications" element={<CommunicationsPage />} />
      </Routes>
    </AppLayout>
  );
}
