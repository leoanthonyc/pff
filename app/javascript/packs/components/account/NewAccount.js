import React, { useState } from "react";
import PropTypes from "prop-types";
import useSaveAccountMutation from "../../utils/useSaveAccountMutation";

const NewAccount = ({ onClose }) => {
  const [name, setName] = useState("");
  const [initialValue, setInitialValue] = useState(0);
  const { saveAccount } = useSaveAccountMutation();

  const handleSave = () => {
    saveAccount({ variables: { name, initialValue } });
    setName("");
    setInitialValue(0);
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
          value={initialValue}
          onChange={(e) => setInitialValue(+e.target.value)}
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
