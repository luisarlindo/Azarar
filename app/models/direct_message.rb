class DirectMessage < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  validates :content, presence: true

  scope :between, ->(user_a, user_b) {
    where(sender: user_a, recipient: user_b).or(where(sender: user_b, recipient: user_a)).order(created_at: :asc)
  }
end