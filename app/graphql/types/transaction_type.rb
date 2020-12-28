# frozen_string_literal: true

module Types
  # gql type for Transaction model
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :payee, PayeeType, null: false
    field :value, Integer, null: false
    field :category, CategoryType, null: false
    field :account, AccountType, null: false
    field :note, String, null: false
  end
end
