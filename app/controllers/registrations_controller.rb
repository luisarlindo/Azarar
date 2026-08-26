class RegistrationsController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "Conta criada com sucesso! Bem-vindo(a) ao Azarar."
      redirect_to root_path
    else
      flash[:alert] = @user.errors.full_messages.join(", ")
      redirect_to root_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :birthdate, :username, :email_or_phone, :password, :password_confirmation)
  end
end