class AddFaceVerificationAndVibeToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :verified, :boolean, default: false, null: false
    add_column :users, :verified_at, :datetime
    add_column :users, :face_similarity_score, :float
    add_column :users, :face_scan_data, :text
    add_column :users, :vibe, :string, default: "🍹 No balcão do bar"
  end
end
