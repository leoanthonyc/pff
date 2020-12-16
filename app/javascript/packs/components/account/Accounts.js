import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/client";
import {
  ACCOUNTS_QUERY,
  SAVE_ACCOUNT_MUTATION,
  DELETE_ACCOUNT_MUTATION,
} from "../../graphql/Account";
import NewAccount from "./NewAccount";

const Account = ({ account }) => {
  const [name, setName] = useState(account.name);
  const [editing, setEditing] = useState(false);
  const [saveAccount] = useMutation(SAVE_ACCOUNT_MUTATION);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          accounts(existingAccounts = [], { readField }) {
            return existingAccounts.filter(
              (ref) => readField("id", ref) !== account.id
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    await deleteAccount({ variables: { id: account.id } });
    setEditing(false);
  };

  const handleSave = async () => {
    await saveAccount({ variables: { id: account.id, name: name } });
    setEditing(false);
  };
  return (
    <>
      {editing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" onClick={() => handleSave()}>
            Save
          </button>
          <button type="button" onClick={() => handleDelete()}>
            Delete
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div>
            <strong>{name}</strong>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
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
      <NewAccount />
      {(data.accounts || []).map((account) => (
        <Account key={account.id} account={account} />
      ))}
    </div>
  );
};

export default Accounts;
