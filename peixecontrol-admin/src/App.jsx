import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';
import CreateUser from './pages/CreateUser/CreateUser';

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-user"
          element={<CreateUser />}
        />
      </Routes>
    </BrowserRouter>
  );
}
