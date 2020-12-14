# frozen_string_literal: true

module Mutations
  # delete transaction
  class DeleteTransaction < BaseMutation
    null false

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      transaction = Transaction.find(id)
      transaction.destroy!
      { success: true }
    end
  end
end
