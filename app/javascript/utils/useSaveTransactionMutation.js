import { gql, useMutation } from "@apollo/client";
import { SAVE_TRANSACTION_MUTATION } from "../graphql/Transaction";

const useSaveTransactionMutation = () => {
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
                  value
                  account {
                    id
                    name
                  }
                  category {
                    id
                    name
                  }
                  payee {
                    id
                    name
                  }
                }
              `,
            });
            return [newTransaction, ...existingTransactions];
          },
        },
      });
    },
  });

  return { saveTransaction };
};

export default useSaveTransactionMutation;
