class ChangeToPlaylistsSongs < ActiveRecord::Migration[7.0]
  def change 
    change_table :playlists_songs do |t|
      t.remove_references :playlist
      t.remove_references :song 

      t.belongs_to :playlist, dependent: :destroy
      t.belongs_to :song, dependent: :destroy
    end
  end
end
