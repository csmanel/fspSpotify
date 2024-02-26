class CreatePlaylist < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.bigint :playlist_id, null: false, index: { unique: true }
      t.bigint :username_id, null: false, index: { unique: true }
      t.string :playlist_name, null:false

      t.timestamps
    end
  end
end
