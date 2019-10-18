import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage"
import PrivateRoute from './components/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <PrivateRoute path="/protected" component={BubblePage} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
