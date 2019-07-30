class UsersController < ApplicationController
  
  def show_sage_advices
  user = User.find(params[:id])
  render :json => user.sage_advices
  end

  def show_events
  user = User.find(params[:id])
  render :json => user.events
  end 

  def show_journal
  user = User.find(params[:id])
  render :json => user.days
  end


 def login
  user = User.find_by(name: params[:name])
  if user
    if user.authenticate(params[:password])
    render json: user
    else
    render json: {error: "INVALID PASSWORD"}, status: 401
    end
  else
    user = User.create(name: params[:name], password: params[:password], password_confirmation: params[:password])
    render json: user 
  end
end

  def user_averages
    user = User.find_by(params[:id])
    user_days = user.days
    user_averages = Day.new()
    user_days.each do |day|
      user_averages.walk += day.walk
      user_averages.workout  += day.workout
      user_averages.read  += day.read
      user_averages.podcast  += day.podcast
      user_averages.media  += day.media
      user_averages.fruit  += day.fruit
      user_averages.vegetable  += day.vegetable 
      user_averages.fish  += day.fish
      user_averages.junk   += day.junk
    end

    if (user_days.length != 0)
    user_averages.walk = user_averages.walk/user_days.length
    user_averages.workout = user_averages.workout/user_days.length
    user_averages.read = user_averages.read/user_days.length
    user_averages.podcast = user_averages.podcast/user_days.length
    user_averages.media = user_averages.media/user_days.length
    user_averages.fruit = user_averages.fruit/user_days.length
    user_averages.vegetable = user_averages.vegetable/user_days.length
    user_averages.fish = user_averages.fish/user_days.length
    user_averages.junk = user_averages.junk/user_days.length
    end

    render :json => user_averages



  end

end
