class HomeController < ApplicationController
  def index
    if logged_in?
      redirect_to mural_index_path
    else
      @user = User.new
    end
  end
end