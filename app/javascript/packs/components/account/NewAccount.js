import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { SAVE_ACCOUNT_MUTATION } from "../../graphql/Account";

const NewAccount = () => {
  const [name, setName] = useState("");
  const [saveAccount] = useMutation(SAVE_ACCOUNT_MUTATION, {
    update(cache, { data: { saveAccount } }) {
      cache.modify({
        fields: {
          accounts(existingAccounts = []) {
            const newAccount = cache.writeFragment({
              data: saveAccount.account,
              fragment: gql`
                fragment NewAccount on Account {
                  id
                  name
                }
              `,
            });
            return [...existingAccounts, newAccount];
          },
        },
      });
    },
  });

  const handleSave = () => {
    saveAccount({ variables: { name } });
    setName("");
  };

  return (
    <div className="new-account">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default NewAccount;
