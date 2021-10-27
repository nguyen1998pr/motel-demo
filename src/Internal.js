import React from "react";
import "./css/App.css";

import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import SingleApartment from "./pages/SingleApartment";
import UserApartment from "./pages/UserApartments";
import Mainpage from "./components/PanoramaView/views/index";
import PrivateRoute from "./utils/privateRoute";
import Error from "./pages/Error";

import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";

function Internal() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/h" component={Home} />
        <Route exact path="/h/apartments" component={Apartments} />
        <Route exact path="/h/apartments/:id" component={SingleApartment} />
        <PrivateRoute
          exact
          path="/h/user/apartments"
          component={UserApartment}
        />
        <PrivateRoute
          exact
          path="/h/user/apartments/:id/panorama"
          component={Mainpage}
        />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default Internal;
