import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateUser from './pages/CreateUser/CreateUser';
import RegisterAdmin from './pages/RegisterAdmin/RegisterAdmin';

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/create-user"
          element={isAuthenticated() ? <CreateUser /> : <Navigate to="/login" />}
        />

        <Route
          path="/register-admin"
          element={isAuthenticated() ? <RegisterAdmin /> : <Navigate to="/login" />}
        />

        {/* Rota catch-all para páginas não encontradas */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
