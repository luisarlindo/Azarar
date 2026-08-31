class Venue < ApplicationRecord
  has_many :checkins, dependent: :destroy
  has_many :users, through: :checkins

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  scope :partners, -> { where(is_partner: true) }
  scope :organic, -> { where(is_partner: false) }
  scope :gold_partners, -> { where(is_partner: true, partner_tier: "gold_partner") }

  def partner?
    is_partner
  end

  def gold_partner?
    is_partner && partner_tier == "gold_partner"
  end

  def active_checkins
    checkins.where(active: true).where("expires_at IS NULL OR expires_at > ?", Time.current)
  end

  def active_users_count
    active_checkins.count
  end

  def formatted_category
    case category.to_s.downcase
    when "bar" then "Bar & Petiscos 🍸"
    when "nightclub" then "Balada & Nightclub 🔥"
    when "beach" then "Praia & Orla 🏖️"
    when "convenience" then "Conveniência & Posto ⛽"
    when "restaurant" then "Restaurante 🍽️"
    when "lounge" then "Lounge VIP ✨"
    else "Local & Point 📍"
    end
  end
end
