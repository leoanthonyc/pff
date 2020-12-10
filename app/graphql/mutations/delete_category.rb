# frozen_string_literal: true

module Mutations
  # destroy category model
  class DeleteCategory < BaseMutation
    null false

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      category = Category.find(id)
      category.destroy!
      { success: true }
    end
  end
end
