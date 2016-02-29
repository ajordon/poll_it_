class OptionsController < ApplicationController

  def create
    @option = Option.new(vote_params)

    if @option.save
      render json: @option, status: :created
    else
      render json: @option.errors, status: :unprocessable_entity
    end
  end

  def index
    render json: Option.all
  end

  private

    def set_vote
      @option = Option.find(params[:id])
    end

    def vote_params
      params.require(:option).permit(:response, :poll_id)
    end
end
