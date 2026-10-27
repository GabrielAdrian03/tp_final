import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";
import { FRONT_ROUTES } from "../config/constants.js";

// Páginas
import Catalog from "../pages/Catalog.jsx";
import Login from "../pages/Login.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import LogsView from "../pages/LogsView.jsx";

// Middleware visual de protección
function ProtectedRoute({ children }) {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to={FRONT_ROUTES.LOGIN} replace />;
    }
    return children;
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rutas Públicas */}
            <Route path={FRONT_ROUTES.CATALOG} element={<Catalog />} />
            <Route path={FRONT_ROUTES.LOGIN} element={<Login />} />

            {/* Rutas Privadas Protegidas */}
            <Route path={FRONT_ROUTES.ADMIN} element={
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path={FRONT_ROUTES.LOGS} element={
                <ProtectedRoute>
                    <LogsView />
                </ProtectedRoute>
            } />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to={FRONT_ROUTES.CATALOG} replace />} />
        </Routes>
    );
}
