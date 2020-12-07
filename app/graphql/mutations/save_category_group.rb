# frozen_string_literal: true

module Mutations
  # Create or update category_group
  class SaveCategoryGroup < BaseMutation
    null false

    argument :id, ID, required: false
    argument :name, String, required: true

    field :category_group, Types::CategoryGroupType, null: false

    def resolve(id: nil, name:)
      category_group = if id
                         CategoryGroup.find(id)
                       else
                         CategoryGroup.new
                       end
      category_group.name = name
      category_group.save!
      { category_group: category_group }
    end
  end
end
