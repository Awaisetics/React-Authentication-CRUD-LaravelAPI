import React from 'react';
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
  return !localStorage.getItem('token') ? children : <Navigate to="/students" />;
}

export default PublicRoute;