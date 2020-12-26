import React from "react";
import Account from "../Account";
import NewAccount from "./NewAccount";
import useAccountsQuery from "../../utils/useAccountsQuery";

const Accounts = () => {
  const { accounts } = useAccountsQuery();

  return (
    <li>
      Accounts
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
