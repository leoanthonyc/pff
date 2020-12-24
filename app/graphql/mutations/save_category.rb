# frozen_string_literal: true

module Mutations
  # Create or update category
  class SaveCategory < BaseMutation
    null false

    argument :id, ID, required: false
    argument :name, String, required: true
    argument :category_group_id, ID, required: true
    argument :goal, Integer, required: false

    field :category, Types::CategoryType, null: false

    def resolve(id: nil, name:, goal: 0, category_group_id:)
      category_group = CategoryGroup.find(category_group_id)
      category = if id
                   category_group.categories.find(id)
                 else
                   category_group.categories.new
                 end
      category.name = name
      category.goal = goal
      category.save!
      { category: category }
    end
  end
end
