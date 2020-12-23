# frozen_string_literal: true

module Types
  # gql type for Payee model
  class PayeeType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
  end
end
