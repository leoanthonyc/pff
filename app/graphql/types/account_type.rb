# frozen_string_literal: true

module Types
  # gql type for Account
  class AccountType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :value, Integer, null: false

    def value
      object.transactions.pluck(:value).sum
    end
  end
end
