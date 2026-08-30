class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post
  has_many :mural_messages, dependent: :destroy
  has_many :sent_messages, class_name: "DirectMessage", foreign_key: :sender_id, dependent: :destroy
  has_many :received_messages, class_name: "DirectMessage", foreign_key: :recipient_id, dependent: :destroy

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

  private

  def clean_username
    self.username = username.to_s.gsub(/^@/, "").strip.downcase if username.present?
    self.email_or_phone = email_or_phone.to_s.strip.downcase if email_or_phone.present?
  end
end