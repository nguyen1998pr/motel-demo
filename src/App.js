import React from "react";
import "./css/App.css";
import InternalContent from "./Internal";
import ExternalContent from "./External";

import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/h" component={InternalContent} />
        <Route exact path="/panorama/view/:id" component={ExternalContent} />
        <Redirect from="/" to="/h"></Redirect>
      </Switch>
    </>
  );
}

export default App;
