import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SAVE_TRANSACTION_MUTATION } from "../../api/transaction";
import { CATEGORY_GROUPS_QUERY } from "../../api/categoryGroup";

const NewTransaction = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { data } = useQuery(CATEGORY_GROUPS_QUERY);

  const [saveTransaction] = useMutation(SAVE_TRANSACTION_MUTATION, {
    update(cache, { data: { saveTransaction } }) {
      cache.modify({
        fields: {
          transactions(existingTransactions = []) {
            const newTransaction = cache.writeFragment({
              data: saveTransaction.transaction,
              fragment: gql`
                fragment NewTransaction on Transaction {
                  id
                  name
                  account {
                    id
                    name
                  }
                  category {
                    id
                    name
                  }
                }
              `,
            });
            return [...existingTransactions, newTransaction];
          },
        },
      });
    },
  });

  const handleSave = async () => {
    await saveTransaction({
      variables: {
        name,
        categoryId,
        accountId: 1,
      },
    });
    setName("");
  };

  useEffect(() => {
    setCategoryId(data?.categoryGroups[0].categories[0].id);
  }, [data?.categoryGroups]);

  return (
    <div>
      <strong>New Transaction </strong>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="category">Category</label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {(data?.categoryGroups || []).map((categoryGroup) => {
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
      <button type="button" onClick={() => handleSave()}>
        Save
      </button>
    </div>
  );
};

export default NewTransaction;
