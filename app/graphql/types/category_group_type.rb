# frozen_string_literal: true

module Types
  # gql type for CategoryGroup model
  class CategoryGroupType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :categories, [CategoryType], null: true
  end
end
