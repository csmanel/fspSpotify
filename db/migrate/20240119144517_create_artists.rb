class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|

      t.string :artist_name, null: false 
      t.boolean :verified, null: false 
      t.bigint :monthly_listeners, null: false 
      t.text :about_txt, null: false 
    
      t.timestamps
    end
  end
end
