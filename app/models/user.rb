class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post
  has_many :mural_messages, dependent: :destroy
  has_many :sent_messages, class_name: "DirectMessage", foreign_key: :sender_id, dependent: :destroy
  has_many :received_messages, class_name: "DirectMessage", foreign_key: :recipient_id, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_one :active_subscription, -> { where(status: "active").where("expires_at IS NULL OR expires_at > ?", Time.current).order(created_at: :desc) }, class_name: "Subscription"

  PLANS = {
    "free" => { name: "Grátis", max_radius_meters: 5_000, price_cents: 0, badge: "Grátis" },
    "bronze" => { name: "Bronze", max_radius_meters: 15_000, price_cents: 990, badge: "Bronze 🥉" },
    "prata" => { name: "Prata", max_radius_meters: 30_000, price_cents: 1990, badge: "Prata 🥈" },
    "ouro" => { name: "Ouro VIP", max_radius_meters: 50_000, price_cents: 3990, badge: "Ouro 🥇" },
    "platina" => { name: "Platina Black", max_radius_meters: 100_000, price_cents: 6990, badge: "Platina 👑" }
  }.freeze

  validates :name, presence: true
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email_or_phone, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  scope :online, -> { where(online_now: true) }
  scope :verified_users, -> { where(verified: true) }

  before_validation :clean_username

  def display_avatar
    avatar_url.presence || "/images/avatars/luisarlindo.jpg"
  end

  def formatted_username
    username.start_with?("@") ? username : "@#{username}"
  end

  def age
    return nil unless birthdate
    now = Time.now.utc.to_date
    now.year - birthdate.year - ((now.month > birthdate.month || (now.month == birthdate.month && now.day >= birthdate.day)) ? 0 : 1)
  end

  def verify_face!(score: 98.6, scan_data: nil)
    update!(
      verified: true,
      verified_at: Time.current,
      face_similarity_score: score,
      face_scan_data: scan_data
    )
  end

  def reset_verification!
    update!(
      verified: false,
      verified_at: nil,
      face_similarity_score: nil,
      face_scan_data: nil
    )
  end

  def current_plan
    active_subscription&.plan_tier || plan || "free"
  end

  def max_radar_distance
    PLANS.dig(current_plan, :max_radius_meters) || 5_000
  end

  def plan_name
    PLANS.dig(current_plan, :name) || "Grátis"
  end

  def plan_badge
    PLANS.dig(current_plan, :badge) || "Grátis"
  end

  def can_access_radius?(meters)
    meters.to_i <= max_radar_distance
  end

  def upgrade_to_plan!(tier, payment_method: "manual", duration_days: 30, transaction_id: nil)
    tier = tier.to_s.downcase
    return false unless PLANS.key?(tier)

    plan_info = PLANS[tier]
    expires = duration_days ? Time.current + duration_days.days : nil

    transaction do
      subscriptions.where(status: "active").update_all(status: "canceled")
      subscriptions.create!(
        plan_tier: tier,
        status: "active",
        price_cents: plan_info[:price_cents],
        starts_at: Time.current,
        expires_at: expires,
        payment_method: payment_method,
        gateway_transaction_id: transaction_id
      )
      update!(plan: tier, plan_expires_at: expires)
    end
    true
  end

  private

  def clean_username
    self.username = username.to_s.gsub(/^@/, "").strip.downcase if username.present?
    self.email_or_phone = email_or_phone.to_s.strip.downcase if email_or_phone.present?
  end
end