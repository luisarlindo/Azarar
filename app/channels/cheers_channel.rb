class CheersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "cheers_user_#{current_user.id}"
  end

  def unsubscribed
  end

  def send_cheers(data)
    target_id = data["target_id"]
    return if target_id.blank?

    target = User.find_by(id: target_id)
    return unless target

    ActionCable.server.broadcast("cheers_user_#{target.id}", {
      action: "cheers_received",
      from_user: {
        id: current_user.id,
        name: current_user.name,
        username: current_user.username,
        avatar: current_user.display_avatar,
        vibe: current_user.vibe || "🍹 No balcão do bar"
      }
    })
  end
end
