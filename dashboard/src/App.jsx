import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import BeneficiariesPage from './pages/BeneficiariesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import AuditLogs from './pages/AuditLogs';

function App() {
  // Simple state base auth (in a real app we tie this into firebase OnAuthStateChanged)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ className: 'font-bold shadow-lg', duration: 4000 }} />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={setIsAuthenticated} /> : <Navigate to="/" />} />
        
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/beneficiaries" element={<BeneficiariesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/audit" element={<AuditLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
