class VenuesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    venues = Venue.visible_in_app.order(is_partner: :desc, stars_tier: :desc, checkins_count: :desc)
    
    # Optional category filter
    if params[:category].present? && params[:category] != "all"
      venues = venues.where(category: params[:category])
    end

    render json: {
      status: "success",
      venues: venues.map { |v| venue_json(v) }
    }
  end

  def search_registered
    venues = Venue.visible_in_app

    if params[:query].present?
      q = "%#{params[:query].to_s.downcase.strip}%"
      venues = venues.where("LOWER(name) LIKE ? OR LOWER(address) LIKE ? OR LOWER(neighborhood) LIKE ?", q, q, q)
    end

    if params[:min_stars].present?
      venues = venues.where("stars_tier >= ?", params[:min_stars].to_i)
    end

    render json: {
      status: "success",
      venues: venues.map { |v| venue_json(v) }
    }
  end

  def show
    venue = Venue.find_by(id: params[:id]) || Venue.find_by(slug: params[:id])
    if venue
      render json: {
        status: "success",
        venue: venue_json(venue, include_users: true)
      }
    else
      render json: { status: "error", message: "Local não encontrado" }, status: :not_found
    end
  end

  def register_b2b
    v_params = params[:venue].presence || params
    stars = [ [ v_params[:stars_tier].to_i, 1 ].max, 5 ].min
    cycle = %w[monthly semiannual annual].include?(v_params[:billing_cycle]) ? v_params[:billing_cycle] : "monthly"

    next_billing = case cycle
                   when "semiannual" then 6.months.from_now
                   when "annual" then 1.year.from_now
                   else 1.month.from_now
                   end

    photos = Array(v_params[:gallery_images] || v_params[:photos]).map(&:to_s).reject(&:blank?).first(stars)
    videos = Array(v_params[:gallery_videos] || v_params[:videos]).map(&:to_s).reject(&:blank?).first(stars)

    venue = Venue.new(
      name: v_params[:name].presence || "Novo Estabelecimento",
      owner_name: v_params[:owner_name],
      cpf: v_params[:cpf],
      cnpj: v_params[:cnpj],
      address: v_params[:address],
      neighborhood: v_params[:neighborhood].presence || "Tambaú",
      city: v_params[:city].presence || "João Pessoa",
      state: v_params[:state].presence || "PB",
      category: v_params[:category].presence || "bar",
      phone: v_params[:phone],
      instagram: v_params[:instagram],
      latitude: v_params[:latitude].presence || -7.1190,
      longitude: v_params[:longitude].presence || -34.8250,
      stars_tier: stars,
      max_photos: stars,
      max_videos: stars,
      billing_cycle: cycle,
      subscription_status: "active",
      next_billing_at: next_billing,
      is_blocked: false,
      is_partner: true,
      partner_tier: stars >= 4 ? "gold_partner" : "silver_partner",
      card_last_four: v_params[:card_number].to_s.last(4),
      card_brand: v_params[:card_brand].presence || "Visa",
      cover_image_url: photos.first || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000",
      description: v_params[:description].presence || "Ambiente exclusivo com o melhor da música, gastronomia e azaração.",
      gallery_images: photos,
      gallery_videos: videos,
      checkins_count: rand(15..45)
    )

    if venue.save
      render json: {
        status: "success",
        message: "Estabelecimento cadastrado com sucesso! Plano #{stars} Estrelas ativado.",
        venue: venue_json(venue)
      }
    else
      render json: { status: "error", message: venue.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def update_media
    venue = Venue.find_by(id: params[:id]) || Venue.find_by(slug: params[:id])
    unless venue
      return render json: { status: "error", message: "Local não encontrado" }, status: :not_found
    end

    max_p = venue.max_photos || venue.stars_tier || 1
    max_v = venue.max_videos || venue.stars_tier || 1

    if (params[:venue]&.dig(:gallery_images) || params[:gallery_images]).present?
      venue.gallery_images = Array((params[:venue]&.dig(:gallery_images) || params[:gallery_images])).first(max_p)
      venue.cover_image_url = venue.gallery_images.first if venue.gallery_images.any?
    end

    if (params[:venue]&.dig(:gallery_videos) || params[:gallery_videos]).present?
      venue.gallery_videos = Array((params[:venue]&.dig(:gallery_videos) || params[:gallery_videos])).first(max_v)
    end

    if venue.save
      render json: {
        status: "success",
        message: "Você pode alterar as fotos e os vídeos a qualquer momento.",
        venue: venue_json(venue)
      }
    else
      render json: { status: "error", message: venue.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def checkin
    venue = Venue.find_by(id: params[:id]) || Venue.find_by(slug: params[:id])
    unless venue
      return render json: { status: "error", message: "Local não encontrado" }, status: :not_found
    end

    if current_user
      current_user.checkin_at!(venue)
      render json: {
        status: "success",
        message: "Check-in realizado com sucesso no #{venue.name}!",
        venue: venue_json(venue, include_users: true)
      }
    else
      render json: { status: "error", message: "Usuário não autenticado" }, status: :unauthorized
    end
  end

  private

  def venue_json(v, include_users: false)
    json = {
      id: v.id,
      name: v.name,
      slug: v.slug,
      category: v.category,
      category_label: v.formatted_category,
      address: v.address,
      neighborhood: v.neighborhood,
      city: v.city,
      state: v.state,
      latitude: v.latitude,
      longitude: v.longitude,
      is_partner: v.is_partner,
      partner_tier: v.partner_tier,
      cover_image_url: v.cover_image_url,
      logo_url: v.logo_url,
      description: v.description,
      instagram: v.instagram,
      phone: v.phone,
      perk_title: v.perk_title,
      perk_description: v.perk_description,
      opening_hours: v.opening_hours,
      vibe: v.vibe,
      checkins_count: v.checkins_count,
      verified: v.is_partner,
      owner_name: v.owner_name,
      cpf: v.cpf,
      cnpj: v.cnpj,
      stars_tier: v.stars_tier || 1,
      max_photos: v.max_photos || v.stars_tier || 1,
      max_videos: v.max_videos || v.stars_tier || 1,
      billing_cycle: v.billing_cycle || "monthly",
      subscription_status: v.subscription_status || "active",
      next_billing_at: v.next_billing_at,
      is_blocked: v.blocked?,
      gallery_images: v.gallery_images || [],
      gallery_videos: v.gallery_videos || []
    }

    if include_users
      checked_in_users = User.where(current_venue_id: v.id).limit(15)
      json[:active_users] = checked_in_users.map do |u|
        {
          id: u.id,
          name: u.name,
          username: u.formatted_username,
          avatar: u.display_avatar,
          age: u.age || 24,
          vibe: u.vibe
        }
      end
    end

    json
  end
end
