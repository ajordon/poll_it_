Rails.application.routes.draw do
  post '/sign-up' => 'users#signup'
  post '/sign-in' => 'users#signin'
  delete '/sign-out/:id' => 'users#signout'
  patch '/change-password/:id' => 'users#changepw'

  resources :users, only: [:index, :show]

  resources :polls, only: [:index, :show, :update]
  resources :polls, except: [:edit, :new, :index, :show] do
    resources :votes, only: [:create, :index]
    resources :options, only: [:create, :index, :show, :update]
  end
end
