import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../widgets/layout/AppLayout";
import { LoginPage } from "../pages/LoginPage/LoginPage.jsx";
import { OperatorDashboard } from "../pages/operator/OperatorDashboard";
import { CallsPage } from "../pages/operator/CallsPage";
import { ClientsPage } from "../pages/operator/ClientsPage";
import { TicketsPage } from "../pages/operator/TicketsPage";
import { KnowledgeBasePage } from "../pages/operator/KnowledgeBasePage";
import { ManagerDashboard } from "../pages/manager/ManagerDashboard";
import { QualityPage } from "../pages/manager/QualityPage";
import { ReportsPage } from "../pages/manager/ReportPage";
import { PlanningPage } from "../pages/manager/PlanningPage.jsx";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            { path: "/", element: <Navigate to="/operator/dashboard" replace /> },
            { path: "/operator/dashboard", element: <OperatorDashboard /> },
            { path: "/operator/calls", element: <CallsPage /> },
            { path: "/operator/clients", element: <ClientsPage /> },
            { path: "/operator/tickets", element: <TicketsPage /> },
            { path: "/operator/kb", element: <KnowledgeBasePage /> },
            { path: "/manager/quality", element: <QualityPage /> },
            { path: "/manager/", element: <ManagerDashboard />},
            { path: "/manager/reports", element: <ReportsPage /> },
            { path: "/manager/planning", element: <PlanningPage /> },
        ],
    },
]);
