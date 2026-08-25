class SessionsController < ApplicationController
  def create
    identifier = params[:identifier].to_s.strip.downcase.gsub(/^@/, "")
    user = User.where("lower(username) = ? OR lower(email_or_phone) = ?", identifier, identifier).first

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      flash[:notice] = "Bem-vindo(a) de volta, #{user.name}!"
      redirect_to mural_index_path
    else
      flash[:alert] = "E-mail, usuÃ¡rio ou senha incorretos."
      redirect_to root_path
    end
  end

  def destroy
    if current_user
      current_user.update(online_now: false)
    end
    session[:user_id] = nil
    flash[:notice] = "VocÃª saiu da sua conta."
    redirect_to root_path
  end
end