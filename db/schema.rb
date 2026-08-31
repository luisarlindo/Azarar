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

ActiveRecord::Schema[8.1].define(version: 2026_08_31_050000) do
  create_table "checkins", force: :cascade do |t|
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "expires_at"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.integer "venue_id", null: false
    t.index ["user_id", "active"], name: "index_checkins_on_user_id_and_active"
    t.index ["user_id"], name: "index_checkins_on_user_id"
    t.index ["venue_id", "active"], name: "index_checkins_on_venue_id_and_active"
    t.index ["venue_id"], name: "index_checkins_on_venue_id"
  end

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

  create_table "subscriptions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "expires_at"
    t.string "gateway_transaction_id"
    t.text "metadata"
    t.string "payment_method", default: "manual"
    t.string "plan_tier", default: "free", null: false
    t.integer "price_cents", default: 0, null: false
    t.datetime "starts_at"
    t.string "status", default: "active", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["gateway_transaction_id"], name: "index_subscriptions_on_gateway_transaction_id"
    t.index ["user_id", "status"], name: "index_subscriptions_on_user_id_and_status"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "avatar_url"
    t.text "bio"
    t.date "birthdate"
    t.datetime "created_at", null: false
    t.integer "current_venue_id"
    t.string "email_or_phone", null: false
    t.text "face_scan_data"
    t.float "face_similarity_score"
    t.string "intentions"
    t.float "latitude"
    t.float "longitude"
    t.string "name", null: false
    t.boolean "online_now", default: false, null: false
    t.string "password_digest", null: false
    t.string "plan", default: "free", null: false
    t.datetime "plan_expires_at"
    t.integer "radius_meters", default: 500, null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.boolean "verified", default: false, null: false
    t.datetime "verified_at"
    t.string "vibe", default: "🍹 No balcão do bar"
    t.index ["current_venue_id"], name: "index_users_on_current_venue_id"
    t.index ["email_or_phone"], name: "index_users_on_email_or_phone", unique: true
    t.index ["plan"], name: "index_users_on_plan"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "venues", force: :cascade do |t|
    t.string "address"
    t.string "category", default: "bar", null: false
    t.integer "checkins_count", default: 0, null: false
    t.string "city", default: "João Pessoa"
    t.string "cover_image_url"
    t.datetime "created_at", null: false
    t.text "description"
    t.text "gallery_images"
    t.string "instagram"
    t.boolean "is_partner", default: false, null: false
    t.float "latitude"
    t.string "logo_url"
    t.float "longitude"
    t.string "name", null: false
    t.string "neighborhood"
    t.string "opening_hours"
    t.string "partner_tier", default: "organic", null: false
    t.text "perk_description"
    t.string "perk_title"
    t.string "phone"
    t.string "slug", null: false
    t.string "state", default: "PB"
    t.datetime "updated_at", null: false
    t.datetime "verified_at"
    t.string "vibe"
    t.index ["is_partner", "partner_tier"], name: "index_venues_on_is_partner_and_partner_tier"
    t.index ["latitude", "longitude"], name: "index_venues_on_latitude_and_longitude"
    t.index ["slug"], name: "index_venues_on_slug", unique: true
  end

  add_foreign_key "checkins", "users"
  add_foreign_key "checkins", "venues"
  add_foreign_key "direct_messages", "users", column: "recipient_id"
  add_foreign_key "direct_messages", "users", column: "sender_id"
  add_foreign_key "likes", "posts"
  add_foreign_key "likes", "users"
  add_foreign_key "mural_messages", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "subscriptions", "users"
end
