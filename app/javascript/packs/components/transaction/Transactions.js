import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  DELETE_TRANSACTION_MUTATION,
  SAVE_TRANSACTION_MUTATION,
  TRANSACTIONS_QUERY,
} from "../../graphql/Transaction";
import { CATEGORY_GROUPS_QUERY } from "../../graphql/CategoryGroup";
import useAccountsQuery from "../../utils/useAccountsQuery";
import NewTransaction from "./NewTransaction";

const Transaction = ({ transaction }) => {
  const [name, setName] = useState(transaction.name);
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [accountId, setAccountId] = useState(transaction.account.id);
  const [editing, setEditing] = useState(false);
  const { data } = useQuery(CATEGORY_GROUPS_QUERY);
  const { accounts } = useAccountsQuery();
  const [saveTransaction] = useMutation(SAVE_TRANSACTION_MUTATION);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          transactions(existingTransactions = [], { readField }) {
            return existingTransactions.filter(
              (ref) => readField("id", ref) !== transaction.id
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    await deleteTransaction({ variables: { id: transaction.id } });
    setEditing(false);
  };

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        id: transaction.id,
        name,
        categoryId,
        accountId,
      },
    });
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
          <label htmlFor="account">Account</label>
          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          >
            {accounts.map((account) => {
              return (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="category">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {(data?.categoryGroups || []).map((categoryGroup) => {
              return (
                <optgroup
                  key={categoryGroup.id || ""}
                  label={categoryGroup.name}
                >
                  {categoryGroup.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
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

const Transactions = () => {
  const { data, error, loading } = useQuery(TRANSACTIONS_QUERY);
  if (error) return <div> Error loading transactions :( </div>;
  if (loading) return <div> Loading transactions ... </div>;
  return (
    <div>
      <NewTransaction />
      {(data.transactions || []).map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;
