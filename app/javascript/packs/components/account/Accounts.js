import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ACCOUNTS_QUERY } from "../../api/account";

const Account = ({ account }) => {
  return <div>{account.name}</div>;
};

Account.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Accounts = () => {
  const { data, error, loading } = useQuery(ACCOUNTS_QUERY);
  if (error) return <div>Error loading accounts :( </div>;
  if (loading) return <div> Loading accounts ... </div>;
  return (
    <div>
      <h2>Accounts</h2>
      {(data.accounts || []).map((account) => (
        <Account key={account.id} account={account} />
      ))}
    </div>
  );
};

export default Accounts;
