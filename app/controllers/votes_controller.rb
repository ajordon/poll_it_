class VotesController < ProtectedController

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
      params.require(:vote).permit(:option_id, :poll_id)
    end
end