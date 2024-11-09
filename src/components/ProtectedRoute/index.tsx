import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAllowed: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAllowed }) => {
    return isAllowed ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
