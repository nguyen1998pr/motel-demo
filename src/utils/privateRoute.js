import React, { useEffect, useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ApartmentContext } from "../context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(ApartmentContext);
  const { getLoginStatus } = context;
  const auth = getLoginStatus();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenExpiration = jwt_decode(token).exp;
      const dateNow = new Date();
      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    ></Route>
  );
};

export default PrivateRoute;
