import React from "react";
import "./css/App.css";

import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import SingleApartment from "./pages/SingleApartment";
import UserApartment from "./pages/UserApartments";
import Mainpage from "./components/PanoramaView/views/index";
import Error from "./pages/Error";

import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/apartments/" component={Apartments} />
        <Route exact path="/user/apartments" component={UserApartment} />
        <Route exact path="/apartments/:id" component={SingleApartment} />
        <Route exact path="/user/apartments/panorama" component={Mainpage} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
