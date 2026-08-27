class DirectChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "direct_chat_#{current_user.id}"
  end

  def unsubscribed
  end

  def speak(data)
    recipient_id = data["recipient_id"]
    content = data["content"].to_s.strip
    return if recipient_id.blank? || content.blank?

    recipient = User.find_by(id: recipient_id)
    return unless recipient

    msg = current_user.sent_messages.create!(
      recipient: recipient,
      content: content
    )

    payload = {
      action: "new_direct_message",
      message: {
        id: msg.id,
        senderId: current_user.id,
        senderName: current_user.name,
        recipientId: recipient.id,
        text: msg.content,
        time: "Agora"
      }
    }

    # Broadcast to recipient
    ActionCable.server.broadcast("direct_chat_#{recipient.id}", payload)

    # Broadcast back to sender (for multi-tab sync)
    ActionCable.server.broadcast("direct_chat_#{current_user.id}", payload)
  end
end
