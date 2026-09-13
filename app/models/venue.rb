class Venue < ApplicationRecord
  serialize :gallery_images, coder: JSON, default: []
  serialize :gallery_videos, coder: JSON, default: []

  has_many :checkins, dependent: :destroy
  has_many :users, through: :checkins

  has_many_attached :venue_photos
  has_many_attached :venue_videos

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

  def photo_urls
    urls = []
    if venue_photos.attached?
      urls += venue_photos.map { |p| Rails.application.routes.url_helpers.rails_blob_path(p, only_path: true) rescue nil }.compact
    end
    if gallery_images.present?
      urls += Array(gallery_images)
    end
    urls.uniq.first(max_photos || stars_tier || 1)
  end

  def video_urls
    urls = []
    if venue_videos.attached?
      urls += venue_videos.map { |v| Rails.application.routes.url_helpers.rails_blob_path(v, only_path: true) rescue nil }.compact
    end
    if gallery_videos.present?
      urls += Array(gallery_videos)
    end
    urls.uniq.first(max_videos || stars_tier || 1)
  end

  def attach_media!(type, data_or_file, filename: nil)
    attachment_assoc = (type.to_s == "video" ? venue_videos : venue_photos)

    if data_or_file.is_a?(ActionDispatch::Http::UploadedFile) || data_or_file.is_a?(Rack::Test::UploadedFile)
      attachment_assoc.attach(data_or_file)
    elsif data_or_file.is_a?(String) && data_or_file.start_with?("data:")
      content_type = data_or_file[/data:(.*?);base64,/, 1] || (type.to_s == "video" ? "video/mp4" : "image/jpeg")
      ext = content_type.split("/").last.presence || (type.to_s == "video" ? "mp4" : "jpg")
      ext = "jpg" if ext == "jpeg"
      base64_data = data_or_file.sub(/data:.*?;base64,/, "")
      decoded_data = Base64.decode64(base64_data)
      fname = filename || "venue_#{type}_#{Time.current.to_i}_#{rand(1000)}.#{ext}"

      attachment_assoc.attach(
        io: StringIO.new(decoded_data),
        filename: fname,
        content_type: content_type
      )
    elsif data_or_file.is_a?(String) && (data_or_file.start_with?("http://", "https://", "/"))
      if type.to_s == "video"
        self.gallery_videos = (Array(gallery_videos) + [data_or_file]).uniq.first(max_videos || stars_tier || 1)
      else
        self.gallery_images = (Array(gallery_images) + [data_or_file]).uniq.first(max_photos || stars_tier || 1)
      end
      save if persisted?
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
