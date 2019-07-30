Rails.application.routes.draw do

  post "/login", to: "users#login"
  get '/user_events/:id', to: 'users#show_events'
  post '/events/create', to: "events#create"
  post '/events/subcreate', to: "events#subcreate"
  get '/events/:id', to: "events#show"
  post 'events/:id', to: "events#update"
  delete 'events/:id', to: "events#destroy"
  get '/user_journal/:id', to: "users#show_journal"
  post '/days/new_entry', to: "days#create"
  get '/user_averages/:id', to: "users#user_averages"
  delete '/days/:id', to: "days#destroy"
  post '/sage_advices/create', to: "sage_advices#create"
  delete '/sage_advices/delete/:id', to: "sage_advices#destroy"
  get '/user_sage_advices/:id', to: "users#show_sage_advices"

end
