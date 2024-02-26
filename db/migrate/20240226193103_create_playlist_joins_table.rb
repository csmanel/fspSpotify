class CreatePlaylistJoinsTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :playlists, :songs do |t|

      t.timestamps
    end
  end
end
