import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Accounts from "./account/Accounts";
import CategoryGroups from "./categoryGroup/CategoryGroups";
import Transactions from "./transaction/Transactions";

const Pff = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-initial text-black p-6">
          <nav>
            <ul>
              <li>
                <NavLink
                  className="flex w-full"
                  activeClassName="rounded-md bg-gray-300"
                  to="/budget"
                >
                  Budget
                </NavLink>
              </li>
              <Accounts />
            </ul>
          </nav>
        </div>
        <div className="flex-1 p-6">
          <Switch>
            <Route path="/budget">
              <CategoryGroups />
            </Route>
            <Route path={`/accounts/:accountId`}>
              <Transactions />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Pff;
