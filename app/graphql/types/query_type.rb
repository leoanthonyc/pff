# frozen_string_literal: true

module Types
  # GraphQL Queries
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
                               description: 'An example field added by the generator'
    def test_field
      'Hello World!'
    end

    field :category_group, Types::CategoryGroupType, null: false do
      argument :id, ID, required: true
    end
    def category_group(id:)
      CategoryGroup.find(id)
    end

    field :category_groups, [Types::CategoryGroupType], null: true
    def category_groups
      CategoryGroup.all
    end

    field :category, Types::CategoryType, null: false do
      argument :id, ID, required: true
    end
    def category(id:)
      Category.find(id)
    end

    field :categories, [Types::CategoryType], null: true
    def categories
      Category.all
    end
  end
end
