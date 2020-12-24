class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.belongs_to :category_group, null: true, foreign_key: true
      t.integer :goal, default: 0

      t.timestamps
    end

    Category.create(name: Category::NOT_BUDGETED)
  end
end
