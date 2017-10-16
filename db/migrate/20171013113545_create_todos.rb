class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      # body
      # user_id references
      # done , default = false
      t.string :body
      t.integer :user_id
      t.boolean :done, defauls: false
      t.timestamps
    end
  end
end
