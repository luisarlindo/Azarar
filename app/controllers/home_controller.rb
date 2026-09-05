class HomeController < ApplicationController
  def index
    @user = current_user || User.first || User.new
    target_user = current_user || User.first
    @user_json = target_user ? user_payload(target_user) : nil
  end

  private

  def user_payload(u)
    {
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.display_avatar,
      verified: u.verified?,
      isVerified: u.verified?,
      bio: u.bio,
      intent: u.intentions,
      vibe: u.vibe,
      plan: u.current_plan,
      planBadge: u.plan_badge,
      radiusMeters: u.radius_meters,
      preferences: u.preferences || {},
      sou: u.sou,
      acompanhado: u.acompanhado,
      procuro: u.procuro
    }
  end
end