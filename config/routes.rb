Rails.application.routes.draw do

  get 'todo_list', to: 'todo_lists#index'
  devise_for :users
  resources :todos, only:[:index, :create, :update, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
