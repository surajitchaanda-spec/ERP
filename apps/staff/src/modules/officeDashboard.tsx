import React from 'react';
import { AdmissionsModule } from './office/admissionsModule';
import { TransportModule } from './office/transportModule';
import { InventoryModule } from './office/inventoryModule';
import { TimetableModule } from './office/timetableModule';
import { AnnouncementsModule } from './shared/announcementsModule';
import { DocumentUploadModule } from './office/documentUploadModule';
import { IncidentModule } from './office/incidentModule';
import { ChatModule } from './shared/chatModule';

export const OfficeDashboard: React.FC = () => (
  <div>
    <h1>Office Dashboard</h1>
    <AdmissionsModule />
    <TransportModule />
    <InventoryModule />
    <TimetableModule />
    <DocumentUploadModule />
    <AnnouncementsModule audience="school" />
    <ChatModule />
    <IncidentModule />
  </div>
);
