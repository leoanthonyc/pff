# frozen_string_literal: true

module Mutations
  # destroy category_group model
  class DeleteCategoryGroup < BaseMutation
    null false

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      category_group = CategoryGroup.find(id)
      category_group.destroy!
      { success: true }
    end
  end
end
