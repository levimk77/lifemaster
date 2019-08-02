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
    user_averages_hash = Hash.new(0)
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
    user_averages_hash[:walk] = user_averages.walk.to_f/user_days.length
    user_averages_hash[:workout] = user_averages.workout.to_f/user_days.length
    user_averages_hash[:read] = user_averages.read.to_f/user_days.length
    user_averages_hash[:podcast] = user_averages.podcast.to_f/user_days.length
    user_averages_hash[:media] = user_averages.media.to_f/user_days.length
    user_averages_hash[:fruit] = user_averages.fruit.to_f/user_days.length
    user_averages_hash[:vegetable] = user_averages.vegetable.to_f/user_days.length
    user_averages_hash[:fish] = user_averages.fish.to_f/user_days.length
    user_averages_hash[:junk] = user_averages.junk.to_f/user_days.length
    end

    render :json => user_averages_hash



  end

end
