class Poll < ActiveRecord::Base
  has_many :votes
  belongs_to :users, inverse_of: :created_by
end
