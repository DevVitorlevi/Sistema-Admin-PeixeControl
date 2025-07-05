import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import CreateUser from '../pages/CreateUser/CreateUser';
import RegisterAdmin from '../pages/RegisterAdmin/RegisterAdmin';

export default function AppRoutes() {
    const isAuthenticated = localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/create-user" element={isAuthenticated ? <CreateUser /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
