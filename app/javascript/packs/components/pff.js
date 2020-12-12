import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard";
import Accounts from "./account/Accounts";
import CategoryGroups from "./categoryGroup/CategoryGroups";

const Pff = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/accounts">Accounts</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/categories">
            <CategoryGroups />
          </Route>
          <Route path="/accounts">
            <Accounts />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Pff;
