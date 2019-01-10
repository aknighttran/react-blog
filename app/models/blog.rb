class Blog < ApplicationRecord
  has_many :posts, dependent: :destroy
end
