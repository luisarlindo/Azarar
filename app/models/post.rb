class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_one_attached :image_file

  validates :caption, presence: true

  scope :recent, -> { order(created_at: :desc) }

  def liked_by?(user)
    return false unless user
    likes.exists?(user_id: user.id)
  end

  def display_image
    if image_file.attached?
      Rails.application.routes.url_helpers.rails_blob_path(image_file, only_path: true)
    else
      image_url.presence
    end
  rescue => e
    image_url.presence
  end

  def attach_image!(data_or_file, filename: nil)
    return unless data_or_file.present?

    if data_or_file.is_a?(ActionDispatch::Http::UploadedFile) || data_or_file.is_a?(Rack::Test::UploadedFile)
      image_file.attach(data_or_file)
      self.image_url = Rails.application.routes.url_helpers.rails_blob_path(image_file, only_path: true) rescue nil
      save if persisted?
    elsif data_or_file.is_a?(String) && data_or_file.start_with?("data:")
      content_type = data_or_file[/data:(.*?);base64,/, 1] || "image/jpeg"
      ext = content_type.split("/").last.presence || "jpg"
      ext = "jpg" if ext == "jpeg"
      base64_data = data_or_file.sub(/data:.*?;base64,/, "")
      decoded_data = Base64.decode64(base64_data)
      fname = filename || "post_#{id || Time.current.to_i}.#{ext}"

      image_file.attach(
        io: StringIO.new(decoded_data),
        filename: fname,
        content_type: content_type
      )
      self.image_url = Rails.application.routes.url_helpers.rails_blob_path(image_file, only_path: true) rescue nil
      save if persisted?
    elsif data_or_file.is_a?(String) && (data_or_file.start_with?("http://", "https://", "/"))
      self.image_url = data_or_file
      save if persisted?
    end
  end
end