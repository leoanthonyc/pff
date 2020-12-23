class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.string :name, null: false
      t.integer :value, default: 0

      t.timestamps
    end
  end
end
