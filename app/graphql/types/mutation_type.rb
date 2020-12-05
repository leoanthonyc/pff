module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
                               description: 'An example field added by the generator'
    def test_field
      'Hello World'
    end

    field :save_category_group, String, null: false
    def save_category_group
      'Save category group'
    end
  end
end
