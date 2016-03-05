class VotesController < ApplicationController
  before_filter :set_vote, only: [:index, :create, :destroy]
  before_filter :set_poll, only: [:index, :create]

  def create
    @vote = Vote.new(vote_params)
    @vote.poll = @poll

    if @vote.save
      render json: @vote, status: :created
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  # /polls/:poll_id/votes
  def index
    @votes = @poll.votes
    render json: @votes
  end

  def destroy
    @vote.destroy
    head :no_content
  end

  private
    def set_poll
      @poll = Poll.find(params[:poll_id])
    end

    def set_vote
      @vote = Vote.find(params[:id])
    end

    def vote_params
      params.require(:vote).permit(:option_id, :poll_id)
    end
end
