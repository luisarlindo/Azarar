class Checkin < ApplicationRecord
  belongs_to :user
  belongs_to :venue, counter_cache: :checkins_count

  scope :active_now, -> { where(active: true).where("expires_at IS NULL OR expires_at > ?", Time.current) }

  before_create :set_default_expiration

  private

  def set_default_expiration
    self.expires_at ||= 4.hours.from_now
  end
end
