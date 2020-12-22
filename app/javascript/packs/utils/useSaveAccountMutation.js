import { useMutation, gql } from "@apollo/client";
import { SAVE_ACCOUNT_MUTATION } from "../graphql/Account";

const useSaveAccountMutation = () => {
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

  return {
    saveAccount,
  };
};

export default useSaveAccountMutation;
