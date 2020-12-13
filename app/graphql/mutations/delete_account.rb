# frozen_string_literal: true

module Mutations
  # delete account
  class DeleteAccount < BaseMutation
    null false

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      account = Account.find(id)
      account.destroy!
      { success: true }
    end
  end
end
