import { gql } from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      name
      category {
        id
        name
      }
      account {
        id
        name
      }
    }
  }
`;

export const SAVE_TRANSACTION_MUTATION = gql`
  mutation SaveTransaction(
    $id: ID
    $name: String!
    $categoryId: ID!
    $accountId: ID!
  ) {
    saveTransaction(
      input: {
        id: $id
        name: $name
        categoryId: $categoryId
        accountId: $accountId
      }
    ) {
      transaction {
        id
        name
        category {
          id
          name
        }
        account {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(input: { id: $id }) {
      success
    }
  }
`;
