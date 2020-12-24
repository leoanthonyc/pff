import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Transactions from "./transaction/Transactions";
import CategoryGroups from "./categoryGroup/CategoryGroups";
import useAccountsQuery from "../utils/useAccountsQuery";

const Pff = () => {
  const { accounts } = useAccountsQuery();
  return (
    <Router>
      <div className="flex">
        <div className="flex-initial text-gray-400 p-6">
          <nav>
            <ul>
              <li className="text-lg hover:text-black">
                <NavLink activeClassName="text-black" to="/budget">
                  Budget
                </NavLink>
              </li>
              <li>
                <div>
                  Accounts
                  <div className="text-lg hover:text-black">
                    {accounts.map(({ id, name }) => (
                      <NavLink
                        key={id}
                        activeClassName="text-black"
                        to={`/accounts/${id}`}
                      >
                        {name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </li>
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
