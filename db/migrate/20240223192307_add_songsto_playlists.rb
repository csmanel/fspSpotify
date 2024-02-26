class AddSongstoPlaylists < ActiveRecord::Migration[7.0]
  def change
    create_join_table :playlists, :songs do |t|
    
    end
  end
end
