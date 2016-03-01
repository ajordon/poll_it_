class Poll < ActiveRecord::Base
  has_many :votes
  has_many :options
  belongs_to :created_by, inverse_of: :polls, class_name: 'User', foreign_key: :created_by


  def self.search_by_key(key)
    if key
      # find(:all, conditions => ['question LIKE?', "%{key}%"])
      Poll.where(["question = ?", key])
    end
  end
end
