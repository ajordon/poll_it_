class OptionsController < ApplicationController
  before_filter :set_vote, only: [:index, :create]
  before_filter :set_option, only: [:index]

  def create
    @option = Option.new(vote_params)
    @option.vote = @vote

    if @option.save
      render json: @option, status: :created
    else
      render json: @option.errors, status: :unprocessable_entity
    end
  end

  def index
    @option = @vote.options
    render json: @options
  end

  private
    def set_vote
      @vote = vote.find(params[:id])
    end

    def set_option
      @option = Option.find(params[:id])
    end

    def vote_params
      params.require(:option).permit(:response, :poll_id)
    end
end
