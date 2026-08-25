class DirectMessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    sent_ids = current_user.sent_messages.pluck(:recipient_id)
    rec_ids = current_user.received_messages.pluck(:sender_id)
    contact_ids = (sent_ids + rec_ids).uniq
    @contacts = User.where(id: contact_ids)
    @suggested = User.where.not(id: current_user.id).where.not(id: contact_ids).limit(5)
  end

  def show
    @recipient = User.find(params[:id])
    @messages = DirectMessage.between(current_user, @recipient)
    @message = DirectMessage.new
  end

  def create
    @recipient = User.find(params[:recipient_id])
    @message = current_user.sent_messages.build(recipient: @recipient, content: params[:direct_message][:content])

    if @message.save
      redirect_to direct_message_path(@recipient)
    else
      redirect_to direct_message_path(@recipient), alert: "Erro ao enviar mensagem"
    end
  end
end