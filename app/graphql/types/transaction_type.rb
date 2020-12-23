# frozen_string_literal: true

module Types
  # gql type for Transaction model
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :value, Integer, null: false
    field :category, CategoryType, null: false
    field :account, AccountType, null: false
    field :payee, PayeeType, null: false

    def value
      object.value || 0
    end
  end
end
