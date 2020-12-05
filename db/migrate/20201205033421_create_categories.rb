class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.belongs_to :category_group, null: false, foreign_key: true
      t.integer :budget

      t.timestamps
    end
  end
end
