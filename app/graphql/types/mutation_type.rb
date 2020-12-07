# frozen_string_literal: true

module Types
  # Mutations
  class MutationType < Types::BaseObject
    field :save_category_group, mutation: Mutations::SaveCategoryGroup
    field :save_category, mutation: Mutations::SaveCategory
  end
end
