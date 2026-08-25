class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.includes(:user, :likes).recent
    @post = Post.new
    @stories_users = User.where.not(id: current_user.id).limit(10)
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      flash[:notice] = "PublicaÃ§Ã£o criada com sucesso!"
      redirect_to posts_path
    else
      flash[:alert] = "Erro ao criar publicaÃ§Ã£o."
      redirect_to posts_path
    end
  end

  def like
    @post = Post.find(params[:id])
    like = @post.likes.find_by(user: current_user)

    if like
      like.destroy
    else
      @post.likes.create(user: current_user)
    end

    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:caption, :image_url)
  end
end