import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { FederationDashboard } from './pages/FederationDashboard';
import { GISIntelligence } from './pages/GISIntelligence';
import { AIAssistant } from './pages/AIAssistant';
import { Welfare } from './pages/Welfare';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="customer" element={<CustomerDashboard />} />
          <Route path="worker" element={<WorkerDashboard />} />
          <Route path="federation" element={<FederationDashboard />} />
          <Route path="gis" element={<GISIntelligence />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="welfare" element={<Welfare />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
