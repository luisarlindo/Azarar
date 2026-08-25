class Post < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy

  validates :caption, presence: true

  scope :recent, -> { order(created_at: :desc) }

  def liked_by?(user)
    return false unless user
    likes.exists?(user_id: user.id)
  end
end