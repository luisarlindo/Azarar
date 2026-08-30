class SubscriptionsController < ApplicationController
  def index
    if current_user
      render json: {
        current_plan: current_user.current_plan,
        plan_name: current_user.plan_name,
        plan_badge: current_user.plan_badge,
        max_radius_meters: current_user.max_radar_distance,
        plan_expires_at: current_user.plan_expires_at&.iso8601,
        plans: User::PLANS
      }
    else
      render json: { error: "Não autenticado" }, status: :unauthorized
    end
  end

  def create
    tier = (params[:plan_tier] || params[:tier] || "free").to_s.downcase

    if current_user
      if User::PLANS.key?(tier)
        current_user.upgrade_to_plan!(tier, payment_method: params[:payment_method] || "manual")
        render json: {
          success: true,
          plan: current_user.current_plan,
          plan_name: current_user.plan_name,
          plan_badge: current_user.plan_badge,
          max_radius_meters: current_user.max_radar_distance,
          plan_expires_at: current_user.plan_expires_at&.iso8601,
          message: "Plano #{current_user.plan_name} ativado com sucesso!"
        }
      else
        render json: { success: false, error: "Plano invñlido" }, status: :unprocessable_entity
      end
    else
      render json: {
        success: true,
        demo: true,
        plan: tier,
        plan_name: User::PLANS.dig(tier, :name) || "Grátis",
        max_radius_meters: User::PLANS.dig(tier, :max_radius_meters) || 5000
      }
    end
  end
end
