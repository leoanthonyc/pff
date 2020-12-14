import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  DELETE_TRANSACTION_MUTATION,
  SAVE_TRANSACTION_MUTATION,
  TRANSACTIONS_QUERY,
} from "../../api/transaction";
import NewTransaction from "./NewTransaction";

const Transaction = ({ transaction }) => {
  const [name, setName] = useState(transaction.name);
  const [editing, setEditing] = useState(false);
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
        name: name,
        categoryId: transaction.category.id,
        accountId: transaction.account.id,
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
