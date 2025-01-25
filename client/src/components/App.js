import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import ConventionAreaForm from "./ConventionAreaForm";


function App() {
  return (
    <Router>
      <main>
        <h1> Convention Event Management</h1>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add-convention-area" component={ConventionAreaForm} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
