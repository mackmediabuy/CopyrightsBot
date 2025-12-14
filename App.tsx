import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewCase from './pages/NewCase';
import CaseDetails from './pages/CaseDetails';
import DMCAGenerator from './pages/DMCAGenerator';
import PublicStatus from './pages/PublicStatus';
import PublicSubmit from './pages/PublicSubmit';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check LocalStorage on load
  useEffect(() => {
    const auth = localStorage.getItem('cb_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (id: string, pass: string): boolean => {
    // HARDCODED CREDENTIALS as per prompt
    if (id === '3101' && pass === '31014') {
      setIsAuthenticated(true);
      localStorage.setItem('cb_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cb_auth');
  };

  const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/status" element={<PublicStatus />} />
        <Route path="/submit-claim" element={<PublicSubmit />} />
        <Route path="/login" element={<Login login={login} />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/new-case" 
          element={
            <ProtectedRoute>
              <NewCase logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/case/:id" 
          element={
            <ProtectedRoute>
              <CaseDetails logout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dmca" 
          element={
            <ProtectedRoute>
              <DMCAGenerator logout={logout} />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;