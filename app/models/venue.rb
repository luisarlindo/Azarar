class Venue < ApplicationRecord
  serialize :gallery_images, coder: JSON, default: []
  serialize :gallery_videos, coder: JSON, default: []

  has_many :checkins, dependent: :destroy
  has_many :users, through: :checkins

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  before_validation :sync_media_limits_with_stars
  before_validation :generate_slug_if_missing

  scope :partners, -> { where(is_partner: true) }
  scope :organic, -> { where(is_partner: false) }
  scope :gold_partners, -> { where(is_partner: true, partner_tier: "gold_partner") }
  scope :visible_in_app, -> { where(is_blocked: false).where("subscription_status = 'active' OR subscription_status IS NULL OR subscription_status = ''") }
  scope :with_coordinates, -> { where.not(latitude: nil, longitude: nil) }

  reverse_geocoded_by :latitude, :longitude

  def distance_to_coords(other_lat, other_lng)
    return nil unless latitude.present? && longitude.present? && other_lat.present? && other_lng.present?
    (Geocoder::Calculations.distance_between([latitude, longitude], [other_lat.to_f, other_lng.to_f], units: :km) * 1000.0).round
  end

  def formatted_distance_to(other_lat, other_lng)
    dist = distance_to_coords(other_lat, other_lng)
    return nil unless dist
    dist >= 1000 ? "#{(dist / 1000.0).round(1).to_s.tr('.', ',')} km" : "#{dist} m"
  end

  def partner?
    is_partner
  end

  def gold_partner?
    is_partner && partner_tier == "gold_partner"
  end

  def blocked?
    is_blocked || (next_billing_at.present? && next_billing_at < Time.current && subscription_status != "active")
  end

  def active_checkins
    checkins.where(active: true).where("expires_at IS NULL OR expires_at > ?", Time.current)
  end

  def active_users_count
    active_checkins.count
  end

  def stars_count
    stars_tier || 1
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

  private

  def sync_media_limits_with_stars
    tier = (stars_tier.presence || 1).to_i
    tier = 1 if tier < 1
    tier = 5 if tier > 5
    self.stars_tier = tier
    self.max_photos = tier
    self.max_videos = tier
  end

  def generate_slug_if_missing
    self.slug = name.to_s.parameterize if slug.blank? && name.present?
  end
end
