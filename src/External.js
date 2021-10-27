import React from "react";
import PortableView from "./pages/PortablePanoramaView";

import { Route, Switch } from "react-router-dom";

function External() {
  return (
    <>
      <Switch>
        <Route path="/panorama/view/:id" component={PortableView} />
      </Switch>
    </>
  );
}

export default External;
