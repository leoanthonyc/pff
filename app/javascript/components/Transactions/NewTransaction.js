import React, { useEffect, useState } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import useAccountsQuery from "../../utils/useAccountsQuery";
import useCategoryGroupsQuery from "../../utils/useCategoryGroupsQuery";
import useSaveTransactionMutation from "../../utils/useSaveTransactionMutation";
import { formatDate } from "../../utils/date";
import usePayeesQuery from "../../utils/usePayeesQuery";

const NewTransaction = ({ accountId, showAccount, onClose }) => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [payee, setPayee] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(accountId || "");
  const [note, setNote] = useState("");
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);
  const { categoryGroups } = useCategoryGroupsQuery();
  const { accounts } = useAccountsQuery();

  const { payees } = usePayeesQuery();

  const { saveTransaction } = useSaveTransactionMutation();

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        date,
        note,
        categoryId,
        payee,
        value: inflow + outflow * -1,
        accountId: selectedAccount,
      },
    });
    setDate(formatDate(new Date()));
    setNote("");
    setInflow("");
    setOutflow("");
    setPayee("");
    onClose();
  };

  useEffect(() => {
    setCategoryId(categoryGroups[0]?.categories[0].id);
  }, [categoryGroups]);

  useEffect(() => {
    selectedAccount === "" && setSelectedAccount(accounts[0]?.id);
  }, [accounts]);

  const filter = createFilterOptions();

  return (
    <tr className="border-t border-b border-dotted">
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </td>
      {showAccount && (
        <td className="px-2">
          <select
            className="ring ring-blue-500 rounded-sm"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
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
      )}
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
        <select
          className="ring ring-blue-500 rounded-sm"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categoryGroups.map((categoryGroup) => {
            return (
              <optgroup key={categoryGroup.id || ""} label={categoryGroup.name}>
                {categoryGroup.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </td>
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </td>
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          placeholder="outflow"
          value={outflow}
          onChange={(e) => setOutflow(+e.target.value)}
        />
      </td>
      <td className="px-2">
        <input
          className="ring ring-blue-500 rounded-sm"
          type="text"
          placeholder="inflow"
          value={inflow}
          onChange={(e) => setInflow(+e.target.value)}
        />
      </td>
      <td className="px-1">
        <button
          className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
          type="button"
          onClick={() => handleSave()}
        >
          Save
        </button>
        <button
          className="border border-transparent hover:border-gray-300 px-2.5 rounded-md focus:bg-gray-300 focus:outline-none"
          type="button"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default NewTransaction;
