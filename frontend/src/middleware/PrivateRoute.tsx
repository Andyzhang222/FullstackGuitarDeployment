import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
