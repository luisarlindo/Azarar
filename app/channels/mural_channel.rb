class MuralChannel < ApplicationCable::Channel
  def subscribed
    stream_from "mural_stream"
  end

  def unsubscribed
    # Any cleanup when channel is unsubscribed
  end

  def speak(data)
    content = data["content"].to_s.strip
    return if content.blank?

    message = current_user.mural_messages.create!(
      content: content,
      radius_meters: current_user.radius_meters || 500
    )

    ActionCable.server.broadcast("mural_stream", {
      action: "new_mural_message",
      message: {
        id: message.id,
        authorId: current_user.id,
        authorName: current_user.name,
        authorUsername: current_user.username,
        authorAvatar: current_user.display_avatar,
        content: message.content,
        distance: 15,
        time: "Agora",
        likes: 0
      }
    })
  end
end
