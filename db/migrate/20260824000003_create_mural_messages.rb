class CreateMuralMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :mural_messages do |t|
      t.references :user, null: false, foreign_key: true
      t.text :content, null: false
      t.float :latitude
      t.float :longitude
      t.integer :radius_meters, default: 500

      t.timestamps
    end
  end
end