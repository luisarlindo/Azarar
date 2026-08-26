Rails.application.routes.draw do
  root "home#index"

  resource :registration, only: [:create]
  resource :session, only: [:create, :destroy]

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

  namespace :api do
    namespace :v1 do
      post "verify_face", to: "/face_verifications#create"
      delete "reset_face", to: "/face_verifications#destroy"
    end
  end
end
