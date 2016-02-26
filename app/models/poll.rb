class Poll < ActiveRecord::Base
  has_many :votes
  belongs_to :user, inverse_of: :created_by
end
