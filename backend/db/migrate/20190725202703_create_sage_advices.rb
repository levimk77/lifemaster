class CreateSageAdvices < ActiveRecord::Migration[5.2]
  def change
    create_table :sage_advices do |t|
      t.integer :user_id
      t.string :source
      t.string :content

      t.timestamps
    end
  end
end
