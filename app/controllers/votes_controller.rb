class VotesController < ApplicationController
  before_filter :set_vote, only: [:index]
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

  def index
    @vote = @poll.votes
    render json: @vote
  end

  private
    def set_poll
      @poll= poll.find(params[:id])
    end

    def set_vote
      @vote = Vote.find(params[:id])
    end

    def vote_params
      params.require(:vote).permit(:option_id, :poll_id)
    end
end
