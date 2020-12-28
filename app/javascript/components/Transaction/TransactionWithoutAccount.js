import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_TRANSACTION_MUTATION,
  SAVE_TRANSACTION_MUTATION,
} from "../../graphql/Transaction";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";

const TransactionWithoutAccount = ({ transaction }) => {
  const [date, setDate] = useState(transaction.date);
  const [payee, setPayee] = useState(transaction.payee?.name ?? "");
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [note, setNote] = useState(transaction.note);
  const [inflow, setInflow] = useState(
    transaction.value >= 0 ? transaction.value : 0
  );
  const [outflow, setOutflow] = useState(
    transaction.value < 0 ? transaction.value * -1 : 0
  );
  const [editing, setEditing] = useState(false);
  const { categoryGroups } = useCategoryGroupsQuery();
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
        date,
        payee,
        categoryId,
        note,
        id: transaction.id,
        accountId: transaction.account.id,
        value: inflow + outflow * -1,
      },
    });
    setEditing(false);
  };

  const systemGenerated = transaction.payee.name == "Initial Value";

  return (
    <tr className="border-t border-b border-dotted">
      {editing ? (
        <>
          {systemGenerated ? (
            <>
              <td className="px-2">{date}</td>
              <td className="px-2">{payee}</td>
              <td className="px-2">{transaction.category.name}</td>
              <td className="px-2">{note}</td>
            </>
          ) : (
            <>
              <td className="px-2">
                <input
                  className="ring ring-blue-500 rounded-sm"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </td>
              <td className="px-2">
                <input
                  className="ring ring-blue-500 rounded-sm"
                  type="text"
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                />
              </td>
              <td className="px-2">
                {transaction.category.name === "notbudgeted" ? (
                  transaction.category.name
                ) : (
                  <select
                    className="ring ring-blue-500 rounded-sm"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categoryGroups.map((categoryGroup) => {
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
                )}
              </td>
              <td className="px-2">
                <input
                  className="ring ring-blue-500 rounded-sm"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </td>
            </>
          )}
          <td className="px-2">
            <input
              className="ring ring-blue-500 rounded-sm"
              type="text"
              value={outflow}
              onChange={(e) => setOutflow(+e.target.value)}
            />
          </td>
          <td className="px-2">
            <input
              className="ring ring-blue-500 rounded-sm"
              type="text"
              value={inflow}
              onChange={(e) => setInflow(+e.target.value)}
            />
          </td>
          <td className="px-1">
            <button
              className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button
              className="pr-1 border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => handleSave()}
            >
              Save
            </button>
            <button
              className="pr-1 border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-2">{date}</td>
          <td className="px-2">{payee}</td>
          <td className="px-2">{transaction.category.name}</td>
          <td className="px-2">{note}</td>
          <td className="px-2">{outflow}</td>
          <td className="px-2">{inflow}</td>
          <td className="px-1">
            <button
              className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
              type="button"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TransactionWithoutAccount;
