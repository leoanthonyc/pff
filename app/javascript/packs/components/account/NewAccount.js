import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
import { SAVE_ACCOUNT_MUTATION } from "../../graphql/Account";

const NewAccount = ({ onClose }) => {
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
    onClose();
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={name}
          placeholder="new account"
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </td>
      <td>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

NewAccount.propTypes = {
  onClose: PropTypes.func.isRequired,
};

NewAccount.defaultProps = {
  onClose: () => {},
};

export default NewAccount;
