class CreateDirectMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :direct_messages do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :recipient, null: false, foreign_key: { to_table: :users }
      t.text :content, null: false
      t.datetime :read_at

      t.timestamps
    end
  end
end