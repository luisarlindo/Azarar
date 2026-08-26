# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_08_26_060704) do
  create_table "direct_messages", force: :cascade do |t|
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "read_at"
    t.integer "recipient_id", null: false
    t.integer "sender_id", null: false
    t.datetime "updated_at", null: false
    t.index ["recipient_id"], name: "index_direct_messages_on_recipient_id"
    t.index ["sender_id"], name: "index_direct_messages_on_sender_id"
  end

  create_table "likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "post_id", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["post_id"], name: "index_likes_on_post_id"
    t.index ["user_id", "post_id"], name: "index_likes_on_user_id_and_post_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "mural_messages", force: :cascade do |t|
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.float "latitude"
    t.float "longitude"
    t.integer "radius_meters", default: 500
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_mural_messages_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text "caption"
    t.datetime "created_at", null: false
    t.string "image_url"
    t.integer "likes_count", default: 0, null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "avatar_url"
    t.text "bio"
    t.date "birthdate"
    t.datetime "created_at", null: false
    t.string "email_or_phone", null: false
    t.text "face_scan_data"
    t.float "face_similarity_score"
    t.string "intentions"
    t.float "latitude"
    t.float "longitude"
    t.string "name", null: false
    t.boolean "online_now", default: false, null: false
    t.string "password_digest", null: false
    t.integer "radius_meters", default: 500, null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.boolean "verified", default: false, null: false
    t.datetime "verified_at"
    t.string "vibe", default: "🍹 No balcão do bar"
    t.index ["email_or_phone"], name: "index_users_on_email_or_phone", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "direct_messages", "users", column: "recipient_id"
  add_foreign_key "direct_messages", "users", column: "sender_id"
  add_foreign_key "likes", "posts"
  add_foreign_key "likes", "users"
  add_foreign_key "mural_messages", "users"
  add_foreign_key "posts", "users"
end
