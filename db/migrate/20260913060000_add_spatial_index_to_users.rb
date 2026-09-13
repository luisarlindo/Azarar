class AddSpatialIndexToUsers < ActiveRecord::Migration[8.1]
  def change
    add_index :users, [:latitude, :longitude], name: "index_users_on_latitude_and_longitude"
    add_index :users, [:online_now, :latitude, :longitude], name: "index_users_on_online_and_coordinates"
  end
end
