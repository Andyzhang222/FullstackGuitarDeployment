import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div>
      <p>你还没有登录，请先登录。</p>
      <Navigate to="/signin" />
    </div>
  );
};

export default PrivateRoute;
