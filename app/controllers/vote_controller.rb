class VoteController < ProtectedController
  before_filter :set_vote, only: [:show]

  def create
    @vote = Vote.new(vote_params)

    if @vote.save
      render json: @vote, status: :created
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  def index
    render json: Vote.all
  end

  private

    def set_vote
      @vote = Vote.find(params[:id])
    end

    def vote_params
      params.require(:vote).permit(:option1_votes, :option2_votes, :post_id)
    end
end
