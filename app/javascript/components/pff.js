import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Accounts from "./Accounts";
import CategoryGroups from "./CategoryGroups";
import Transactions from "./Transactions";

const Pff = () => {
  return (
    <Router>
      <div className="flex px-2">
        <div className="flex-initial text-black p-6">
          <div className="text-2xl font-bold">
            <NavLink className="px-2" to="/budget">
              PFF
            </NavLink>
          </div>
          <nav>
            <ul className="py-2">
              <li>
                <NavLink
                  className="flex w-full px-2"
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
            <Route path={`/accounts/:accountId`}>
              <Transactions />
            </Route>
            <Route path={["/", "/budget/:monthYear"]}>
              <CategoryGroups />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Pff;
