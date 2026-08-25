class MuralMessagesController < ApplicationController
  before_action :authenticate_user!

  def create
    @mural_message = current_user.mural_messages.build(mural_message_params)
    @mural_message.radius_meters = current_user.radius_meters

    if @mural_message.save
      redirect_to mural_index_path
    else
      redirect_to mural_index_path, alert: "NÃ£o foi possÃ­vel enviar a mensagem."
    end
  end

  private

  def mural_message_params
    params.require(:mural_message).permit(:content)
  end
end