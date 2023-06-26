import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Home from "../HomePage/HomePage";
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Home {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
}

export default PrivateRoute;