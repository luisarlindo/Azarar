class Subscription < ApplicationRecord
  belongs_to :user

  PLAN_TIERS = %w[free bronze prata ouro platina].freeze
  STATUSES = %w[active expired canceled pending].freeze

  validates :plan_tier, inclusion: { in: PLAN_TIERS }
  validates :status, inclusion: { in: STATUSES }

  scope :active, -> { where(status: 'active') }
  scope :valid_now, -> { active.where('expires_at IS NULL OR expires_at > ?', Time.current) }

  def active?
    status == 'active' && (expires_at.nil? || expires_at > Time.current)
  end

  def formatted_price
    format('R$ %.2f', (price_cents / 100.0)).tr('.', ',')
  end
end
