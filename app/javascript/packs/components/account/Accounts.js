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
    await saveAccount({ variables: { id: account.id, name } });
    setEditing(false);
  };
  return (
    <tr className="border-t border-b border-dotted">
      {editing ? (
        <>
          <td>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td>{account.value}</td>
          <td>
            <button type="button" onClick={() => handleSave()}>
              Save
            </button>
            <button type="button" onClick={() => handleDelete()}>
              Delete
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{account.value}</td>
          <td>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
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
  const [newAccount, setNewAccount] = useState(false);
  if (error) return <div>Error loading accounts :( </div>;
  if (loading) return <div> Loading accounts ... </div>;
  return (
    <div>
      <div className="pb-4">
        <button
          className="rounded-lg p-2 text-gray-100 hover:text-white bg-gray-500 font-semibold shadow-md"
          type="button"
          onClick={() => setNewAccount(true)}
        >
          New Account
        </button>
      </div>
      <table className="table-fixed w-full shadow-lg text-left">
        <thead className="bg-gray-200">
          <tr>
            <th>Account</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newAccount && <NewAccount onClose={() => setNewAccount(false)} />}
          {(data.accounts || []).map((account) => (
            <Account key={account.id} account={account} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
