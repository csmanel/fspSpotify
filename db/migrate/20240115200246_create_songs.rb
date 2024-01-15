class CreateSongs < ActiveRecord::Migration[7.1]
  def change
    create_table :songs do |t|
      t.bigint :artist_id, null: false
      t.bigint :album_id, null: false
      t.integer :duration, null: false 
      t.integer :track_num, null: false 
      t.string :name, null: false

      t.timestamps
    end
  end
end
