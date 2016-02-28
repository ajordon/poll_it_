#
class VoteSerializer < ActiveModel::Serializer
  attributes :id, :email, :gender # , :can_edit
end
