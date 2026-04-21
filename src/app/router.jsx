import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../widgets/layout/AppLayout";
import { LoginPage } from "../pages/LoginPage/LoginPage.jsx";
import { RequireAuth } from "../features/auth/RequireAuth.jsx";
import { RequireRole } from "../features/auth/RequireRole.jsx";
import { OperatorDashboard } from "../pages/operator/OperatorDashboard";
import { CallsPage } from "../pages/operator/CallsPage";
import { ClientsPage } from "../pages/operator/ClientsPage";
import { TicketsPage } from "../pages/operator/TicketsPage";
import { KnowledgeBasePage } from "../pages/operator/KnowledgeBasePage";
import { ManagerDashboard } from "../pages/manager/ManagerDashboard";
import { QualityPage } from "../pages/manager/QualityPage";
import { ReportsPage } from "../pages/manager/ReportPage";
import { PlanningPage } from "../pages/manager/PlanningPage.jsx";
import {TicketDetailsPage} from "../pages/operator/TicketDetailsPage.jsx";

export const router = createBrowserRouter([


    {
        path: "/login",
        element: <LoginPage />,
    },


    {
        path: "/",
        element: <Navigate to="/operator/dashboard" replace />,
    },

    // Все защищённые страницы С AppLayout
    {
        element: <RequireAuth />,
        children: [
            {
                element: <AppLayout />,  // ← AppLayout только здесь
                children: [
                    {
                        element: <RequireRole roles={["operator"]} />,
                        children: [
                            { path: "/operator/dashboard", element: <OperatorDashboard /> },
                            { path: "/operator/calls",     element: <CallsPage /> },
                            { path: "/operator/clients",   element: <ClientsPage /> },
                            { path: "/operator/tickets",   element: <TicketsPage /> },
                            { path: "/operator/kb",        element: <KnowledgeBasePage /> },
                            { path: "/operator/tickets/:id", element: <TicketDetailsPage />,}
                        ],
                    },
                    {
                        element: <RequireRole roles={["manager"]} />,
                        children: [
                            { path: "/manager/dashboard", element: <ManagerDashboard /> },
                            { path: "/manager/quality",   element: <QualityPage /> },
                            { path: "/manager/reports",   element: <ReportsPage /> },
                            { path: "/manager/planning",  element: <PlanningPage /> },
                        ],
                    },
                ],
            },
        ],
    },

    { path: "*", element: <Navigate to="/login" replace /> },
]);