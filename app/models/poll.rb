class Poll < ActiveRecord::Base
  has_many :votes, dependent: :destroy
  has_many :options, dependent: :destroy
  belongs_to :created_by, inverse_of: :polls, class_name: 'User', foreign_key: :created_by


  def self.search_by_key(key)
    if key
      # add question mark to the end if not present
      if !key.include?('?')
        key.concat('?')
      end

      Poll.where({ question: key })
    end
  end
end
