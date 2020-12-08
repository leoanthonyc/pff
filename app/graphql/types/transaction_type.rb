# frozen_string_literal: true

module Types
  # gql type for Transaction model
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :category, CategoryType, null: false
    field :account, AccountType, null: false
  end
end
