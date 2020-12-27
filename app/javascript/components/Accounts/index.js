import React from "react";
import Account from "../Account";
import NewAccount from "./NewAccount";
import useAccountsQuery from "../../utils/useAccountsQuery";
import { NavLink } from "react-router-dom";

const Accounts = () => {
  const { accounts } = useAccountsQuery();

  return (
    <li>
      <NavLink
        className="flex justify-between w-full"
        activeClassName="rounded-md bg-gray-300"
        to={"/accounts/all"}
      >
        Accounts
      </NavLink>
      <ul className="ml-2">
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </ul>
      <NewAccount />
    </li>
  );
};

export default Accounts;
