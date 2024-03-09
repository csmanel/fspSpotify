class AddImgUrlToPlaylists < ActiveRecord::Migration[7.0]
  def change
    add_column :playlists, :img_url, :string
  end
end
