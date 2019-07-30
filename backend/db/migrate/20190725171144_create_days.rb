class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days do |t|
      t.integer :user_id, :default => 0
      t.integer :walk, :default => 0
      t.integer :workout, :default => 0
      t.integer :read, :default => 0
      t.integer :podcast, :default => 0
      t.integer :media, :default => 0
      t.integer :fruit, :default => 0
      t.integer :vegetable, :default => 0
      t.integer :fish, :default => 0
      t.integer :junk, :default => 0

      t.timestamps
    end
  end
end
