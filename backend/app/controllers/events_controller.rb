class EventsController < ApplicationController

    def create
        newEvent = Event.create(user_id: params[:user_id], description: params[:description])
        render :json => newEvent
    end

    def subcreate
        newEvent = Event.create(user_id: params[:user_id], description: params[:description], parent_event_id: params[:parent_event_id])
        render :json => newEvent
    end

    def show
        event = Event.find(params[:id])
        render :json => event.sub_events
    end

    def update
        event = Event.find(params[:id])
        completion_status = ActiveModel::Type::Boolean.new.cast(params[:completion_status])
        event.assign_attributes(completion_status: completion_status)
        event.save
        render :json => event 
    end

    def destroy
    event = Event.find(params[:id])
    event.destroy
    render :json => event 
    end

end
