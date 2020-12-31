# frozen_string_literal: true

module Types
  # gql type for Category model
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :goal, Integer, null: false
    field :category_group, Types::CategoryGroupType, null: false
  end
end
