class CreateVenuesAndCheckins < ActiveRecord::Migration[8.1]
  def change
    create_table :venues do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :category, default: "bar", null: false
      t.string :address
      t.string :neighborhood
      t.string :city, default: "João Pessoa"
      t.string :state, default: "PB"
      t.float :latitude
      t.float :longitude
      t.boolean :is_partner, default: false, null: false
      t.string :partner_tier, default: "organic", null: false
      t.string :cover_image_url
      t.string :logo_url
      t.text :gallery_images
      t.text :description
      t.string :instagram
      t.string :phone
      t.string :perk_title
      t.text :perk_description
      t.string :opening_hours
      t.string :vibe
      t.datetime :verified_at
      t.integer :checkins_count, default: 0, null: false

      t.timestamps
    end

    add_index :venues, :slug, unique: true
    add_index :venues, [:is_partner, :partner_tier]
    add_index :venues, [:latitude, :longitude]

    create_table :checkins do |t|
      t.references :user, null: false, foreign_key: true
      t.references :venue, null: false, foreign_key: true
      t.boolean :active, default: true, null: false
      t.datetime :expires_at

      t.timestamps
    end

    add_index :checkins, [:venue_id, :active]
    add_index :checkins, [:user_id, :active]

    add_column :users, :current_venue_id, :integer
    add_index :users, :current_venue_id
  end
end
