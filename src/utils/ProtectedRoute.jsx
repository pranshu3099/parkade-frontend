import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/Provider";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const {user} = useAuth();
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default ProtectedRoute;