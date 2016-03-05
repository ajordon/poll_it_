#
class VoteSerializer < ActiveModel::Serializer
  attributes :option_id # , :can_edit
  has_one :user
end
