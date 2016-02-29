Rails.application.routes.draw do
  post '/sign-up' => 'users#signup'
  post '/sign-in' => 'users#signin'
  delete '/sign-out/:id' => 'users#signout'
  patch '/change-password/:id' => 'users#changepw'

  resources :users, only: [:index, :show] do
    resources :polls
  end

  resources :polls, except: [:edit] do
    resources :votes, only: [:new, :index, :show]
    resources :options, except: [:new, :edit]
  end

  resources :votes, only: [:new, :index, :show]
end
