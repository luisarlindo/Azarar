class MuralController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json do
        @mural_messages = MuralMessage.includes(:user).recent.reverse
        render json: @mural_messages
      end
    end
  end
end