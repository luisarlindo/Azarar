class AddB2bFieldsToVenues < ActiveRecord::Migration[8.1]
  def change
    add_column :venues, :owner_name, :string
    add_column :venues, :cpf, :string
    add_column :venues, :cnpj, :string
    add_column :venues, :stars_tier, :integer, default: 1, null: false
    add_column :venues, :max_photos, :integer, default: 1, null: false
    add_column :venues, :max_videos, :integer, default: 1, null: false
    add_column :venues, :billing_cycle, :string, default: "monthly", null: false
    add_column :venues, :subscription_status, :string, default: "active", null: false
    add_column :venues, :next_billing_at, :datetime
    add_column :venues, :is_blocked, :boolean, default: false, null: false
    add_column :venues, :gallery_videos, :text
    add_column :venues, :card_last_four, :string
    add_column :venues, :card_brand, :string

    add_index :venues, :stars_tier
    add_index :venues, :subscription_status
    add_index :venues, :is_blocked
  end
end
