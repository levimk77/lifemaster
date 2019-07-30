class DaysController < ApplicationController
    def create 
    newDay = Day.create(user_id: params[:user_id], walk: params[:walk], workout: params[:workout], read: params[:read], podcast: params[:podcast], media: params[:media], fruit: params[:fruit], vegetable: params[:vegetable], fish: params[:fish], junk: params[:junk])
    render :json => newDay
    end

    def destroy

    day = Day.find(params[:id])
    day.destroy
    render :json => day
    end

end
