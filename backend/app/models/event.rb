class Event < ApplicationRecord
    belongs_to :user
    belongs_to :parent_event, :class_name => 'Event', :foreign_key => 'parent_event_id', :optional => true
    has_many :sub_events, :class_name => 'Event', :foreign_key => 'parent_event_id'

    def parent_event
    Event.find(self.parent_event_id)
    end

    def sub_events
    Event.where(parent_event_id: self.id)
    end

    

end
