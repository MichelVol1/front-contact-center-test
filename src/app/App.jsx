import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CallProvider } from './contexts/CallContext';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import OperatorPage from './pages/OperatorPage/OperatorPage';
import CallsPage from './pages/CallsPage/CallsPage';
import AgentsPage from './pages/AgentsPage/AgentsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CallProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<Layout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="operator" element={<OperatorPage />} />
                            <Route path="calls" element={<CallsPage />} />
                            <Route path="calls/:id" element={<CallsPage />} />
                            <Route path="agents" element={<AgentsPage />} />
                            <Route path="agents/:id" element={<AgentsPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </CallProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;