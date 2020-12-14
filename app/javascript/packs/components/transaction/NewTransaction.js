import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { SAVE_TRANSACTION_MUTATION } from "../../api/transaction";

const NewTransaction = () => {
  const [name, setName] = useState("");
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
        accountId: 1,
        categoryId: 1,
      },
    });
    setName("");
  };

  return (
    <div>
      <strong>New Transaction </strong>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={() => handleSave()}>
        Save
      </button>
    </div>
  );
};

export default NewTransaction;
