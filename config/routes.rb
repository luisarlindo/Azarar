Rails.application.routes.draw do
  root "home#index"

  resource :registration, only: [:create]
  get "logout", to: "sessions#destroy"
  delete "logout", to: "sessions#destroy"
  resource :session, only: [:create, :destroy] do
    post :face_login
  end

  resources :mural, only: [:index]
  resources :mural_messages, only: [:create]

  resources :posts, only: [:index, :create] do
    member do
      post :like
    end
  end

  resource :profile, only: [:show, :edit, :update] do
    post :toggle_online
  end

  resources :users, only: [:show], controller: "profiles"
  resources :direct_messages, only: [:index, :show, :create]

  resource :face_verification, only: [:create, :destroy]

  resources :subscriptions, only: [:index, :create]
  resources :venues, only: [:index, :show, :create] do
    collection do
      post :register_b2b
      get :search_registered
    end
    member do
      post :checkin
      patch :update_media
    end
  end

  namespace :api do
    namespace :v1 do
      post "verify_face", to: "/face_verifications#create"
      delete "reset_face", to: "/face_verifications#destroy"
      post "face_login", to: "/sessions#face_login"
      post "update_location", to: "/locations#update"
      post "update_radius", to: "/locations#update_radius"
      post "update_plan", to: "/subscriptions#create"
      get "subscriptions", to: "/subscriptions#index"
      get "nearby_users", to: "/locations#nearby"
      get "venues", to: "/venues#index"
      get "venues/search_registered", to: "/venues#search_registered"
      post "venues/register_b2b", to: "/venues#register_b2b"
      get "venues/:id", to: "/venues#show"
      post "venues/:id/checkin", to: "/venues#checkin"
      patch "venues/:id/update_media", to: "/venues#update_media"
    end
  end
end
