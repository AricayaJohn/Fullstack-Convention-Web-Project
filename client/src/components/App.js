import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";


function App() {
  return (
    <Router>
      <main>
        <h1> Convention Event Management</h1>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
