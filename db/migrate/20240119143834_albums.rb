class Albums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
     
      t.references :artist, null: false
      t.string :title, null: false
      t.integer :duration, null: false 
      t.datetime :release_date, null: false
      
      t.timestamps
    end
  end
end
