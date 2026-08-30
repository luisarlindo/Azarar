class CreateSubscriptionsAndAddPlanToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :plan, :string, default: 'free', null: false
    add_column :users, :plan_expires_at, :datetime
    add_index :users, :plan

    create_table :subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :plan_tier, null: false, default: 'free'
      t.string :status, null: false, default: 'active'
      t.integer :price_cents, default: 0, null: false
      t.datetime :starts_at
      t.datetime :expires_at
      t.string :payment_method, default: 'manual'
      t.string :gateway_transaction_id
      t.text :metadata

      t.timestamps
    end

    add_index :subscriptions, [:user_id, :status]
    add_index :subscriptions, :gateway_transaction_id
  end
end
