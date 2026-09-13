class PostsController < ApplicationController
  protect_from_forgery with: :null_session, if: -> { request.format.json? }
  before_action :set_post_author

  def index
    @posts = Post.includes(:user, :likes, image_file_attachment: :blob).recent
    @post = Post.new
    @stories_users = User.where.not(id: @current_author&.id).limit(10)

    respond_to do |format|
      format.html
      format.json do
        render json: {
          success: true,
          posts: @posts.map { |p| post_json(p) }
        }
      end
    end
  end

  def create
    @post = @current_author.posts.build(post_params.except(:image, :image_file))
    
    # Handle image attachment (File or Base64 DataURL or URL)
    image_param = params[:image] || params[:image_file] || params.dig(:post, :image) || params.dig(:post, :image_file) || params.dig(:post, :image_url)
    if image_param.present?
      @post.attach_image!(image_param)
    end

    respond_to do |format|
      if @post.save
        format.html do
          flash[:notice] = "Publicação criada com sucesso!"
          redirect_to posts_path
        end
        format.json do
          render json: {
            success: true,
            message: "Publicação criada com sucesso!",
            post: post_json(@post)
          }
        end
      else
        format.html do
          flash[:alert] = "Erro ao criar publicação: #{@post.errors.full_messages.join(', ')}"
          redirect_to posts_path
        end
        format.json do
          render json: {
            success: false,
            errors: @post.errors.full_messages
          }, status: :unprocessable_entity
        end
      end
    end
  end

  def like
    @post = Post.find(params[:id])
    like = @post.likes.find_by(user: @current_author)

    if like
      like.destroy
    else
      @post.likes.create(user: @current_author)
    end

    respond_to do |format|
      format.html { redirect_to posts_path }
      format.json do
        render json: {
          success: true,
          liked: !like,
          likes_count: @post.likes.count
        }
      end
    end
  end

  private

  def set_post_author
    @current_author = current_user || User.first
    unless @current_author
      respond_to do |format|
        format.html { redirect_to root_path, alert: "Faça login para continuar" }
        format.json { render json: { success: false, error: "Usuário não autenticado" }, status: :unauthorized }
      end
    end
  end

  def post_params
    if params[:post].present? && params[:post].is_a?(ActionController::Parameters)
      params.require(:post).permit(:caption, :image_url, :image, :image_file)
    else
      params.permit(:caption, :image_url, :image, :image_file)
    end
  end

  def post_json(p)
    {
      id: p.id,
      caption: p.caption,
      image: p.display_image,
      image_url: p.display_image,
      likes: p.likes.count,
      likes_count: p.likes.count,
      likedByMe: @current_author ? p.liked_by?(@current_author) : false,
      timestamp: p.created_at.strftime("%H:%M - %d/%m"),
      authorId: p.user.id,
      authorName: p.user.name,
      authorUsername: p.user.formatted_username,
      authorAvatar: p.user.display_avatar
    }
  end
end