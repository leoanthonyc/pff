import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "./dashboard";
import Accounts from "./account/Accounts";
import CategoryGroups from "./categoryGroup/CategoryGroups";

const Pff = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-initial text-gray-400 p-6">
          <nav>
            <ul>
              <li className="text-lg hover:text-black">
                <NavLink activeClassName="text-black" to="/transactions">
                  Transactions
                </NavLink>
              </li>
              <li className="text-lg hover:text-black">
                <NavLink activeClassName="text-black" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="text-lg hover:text-black">
                <NavLink activeClassName="text-black" to="/accounts">
                  Accounts
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1 p-6">
          <Switch>
            <Route path="/categories">
              <CategoryGroups />
            </Route>
            <Route path="/accounts">
              <Accounts />
            </Route>
            <Route path="/transactions">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Pff;
