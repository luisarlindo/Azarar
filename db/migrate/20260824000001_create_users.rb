class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.date :birthdate
      t.string :username, null: false, index: { unique: true }
      t.string :email_or_phone, null: false, index: { unique: true }
      t.string :password_digest, null: false
      t.text :bio
      t.string :avatar_url
      t.boolean :online_now, default: false, null: false
      t.integer :radius_meters, default: 500, null: false
      t.float :latitude
      t.float :longitude
      t.string :intentions

      t.timestamps
    end
  end
end