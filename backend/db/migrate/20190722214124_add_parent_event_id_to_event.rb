class AddParentEventIdToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :parent_event_id, :integer
  end
end
