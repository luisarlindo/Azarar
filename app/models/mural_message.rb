class MuralMessage < ApplicationRecord
  belongs_to :user

  validates :content, presence: true

  scope :recent, -> { order(created_at: :desc).limit(50) }
end