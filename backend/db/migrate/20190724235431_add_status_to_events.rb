class AddStatusToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :completion_status, :boolean, :default => false 
  end
end
