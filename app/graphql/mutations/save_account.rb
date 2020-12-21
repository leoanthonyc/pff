# frozen_string_literal: true

module Mutations
  # Create or update account model
  class SaveAccount < BaseMutation
    null false

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :value, Integer, required: true

    field :account, Types::AccountType, null: false

    def resolve(id: nil, name:, value:)
      account = if id
                  Account.find(id)
                else
                  Account.new
                end
      account.name = name
      account.value = value
      account.save!
      { account: account }
    end
  end
end
