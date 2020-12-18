import { gql } from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      name
      value
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
    $value: Int
    $categoryId: ID!
    $accountId: ID!
  ) {
    saveTransaction(
      input: {
        id: $id
        name: $name
        value: $value
        categoryId: $categoryId
        accountId: $accountId
      }
    ) {
      transaction {
        id
        name
        value
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
