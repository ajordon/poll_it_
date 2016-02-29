class PollSerializer < ActiveModel::Serializer
  attributes :question, :date_closed, :created_by
end
