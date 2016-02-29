#
class VoteSerializer < ActiveModel::Serializer
  attributes :poll_id # , :can_edit
  has_one :user
end
