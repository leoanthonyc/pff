import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { SAVE_ACCOUNT_MUTATION } from "../../graphql/Account";

const NewAccount = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
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
                  value
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
    saveAccount({ variables: { name, value } });
    setName("");
    setValue(0);
  };

  return (
    <div className="new-account">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default NewAccount;
