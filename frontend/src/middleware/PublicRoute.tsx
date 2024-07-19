import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ authenticated }: { authenticated: boolean }) => {
  return authenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
