import { useMutation, gql } from "@apollo/client";
import { DELETE_ACCOUNT_MUTATION } from "../graphql/Account";

const useDeleteAccountMutation = (account) => {
  const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION, {
    update(cache) {
      cache.modify({
        fields: {
          accounts(existingAccounts = [], { readField }) {
            return existingAccounts.filter(
              (ref) => readField("id", ref) !== account.id
            );
          },
        },
      });
    },
  });

  return {
    deleteAccount,
  };
};

export default useDeleteAccountMutation;
