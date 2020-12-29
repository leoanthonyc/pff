import React, { useState } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { useMutation } from "@apollo/client";
import {
  DELETE_TRANSACTION_MUTATION,
  SAVE_TRANSACTION_MUTATION,
} from "../../graphql/Transaction";
import useAccountsQuery from "../../utils/useAccountsQuery";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";
import usePayeesQuery from "../../utils/usePayeesQuery";

const TransactionWithAccount = ({ transaction }) => {
  const [date, setDate] = useState(transaction.date);
  const [payee, setPayee] = useState(transaction.payee?.name ?? "");
  const [categoryId, setCategoryId] = useState(transaction.category.id);
  const [accountId, setAccountId] = useState(transaction.account.id);
  const [note, setNote] = useState(transaction.note);
  const [inflow, setInflow] = useState(
    transaction.value >= 0 ? transaction.value : 0
  );
  const [outflow, setOutflow] = useState(
    transaction.value < 0 ? transaction.value * -1 : 0
  );
  const [editing, setEditing] = useState(false);

  const { accounts } = useAccountsQuery();
  const { categoryGroups } = useCategoryGroupsQuery();
  const { payees } = usePayeesQuery();

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
        note,
        value: inflow + outflow * -1,
        categoryId,
        accountId,
        payee,
        id: transaction.id,
      },
    });
    setEditing(false);
  };

  const systemGenerated = transaction.payee.name == "Initial Value";

  const filter = createFilterOptions();

  return (
    <tr className="border-t border-b border-dotted">
      {editing ? (
        <>
          {systemGenerated ? (
            <>
              <td className="px-2">{date}</td>
              <td className="px-2">{transaction.account.name}</td>
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
                <select
                  className="ring ring-blue-500 rounded-sm"
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
              </td>
              <td className="px-2">
                <Autocomplete
                  freeSolo
                  className="ring ring-blue-500 rounded-sm"
                  size="small"
                  options={payees}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(option) => option.name}
                  style={{ width: "100%" }}
                  onChange={(_, newValue) => {
                    if (typeof newValue === "string") {
                      setPayee(newValue);
                    } else if (newValue && newValue.inputValue) {
                      setPayee(newValue.inputValue);
                    } else {
                      setPayee(newValue.name);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        {...params.inputProps}
                      />
                    </div>
                  )}
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
          <td className="px-2">{transaction.account.name}</td>
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

export default TransactionWithAccount;
