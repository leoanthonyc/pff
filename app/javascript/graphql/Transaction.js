import { gql } from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
  query Transactions($accountId: ID) {
    transactions(accountId: $accountId) {
      id
      value
      payee {
        id
        name
      }
      category {
        id
        name
      }
      account {
        id
        name
        value
      }
      note
    }
  }
`;

export const SAVE_TRANSACTION_MUTATION = gql`
  mutation SaveTransaction(
    $id: ID
    $payee: String!
    $value: Int
    $categoryId: ID!
    $accountId: ID!
    $note: String
  ) {
    saveTransaction(
      input: {
        id: $id
        payee: $payee
        value: $value
        categoryId: $categoryId
        accountId: $accountId
        note: $note
      }
    ) {
      transaction {
        id
        value
        payee {
          id
          name
        }
        category {
          id
          name
        }
        account {
          id
          name
          value
        }
        note
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
