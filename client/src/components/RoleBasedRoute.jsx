import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RoleBasedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleBasedRoute;

