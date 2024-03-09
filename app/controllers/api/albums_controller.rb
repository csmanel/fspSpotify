class Api::AlbumsController < ApplicationController

  def index 
    @albums = Album.includes(:songs, :artist).all 
    @artists = @albums.map(&:artist)
  end

  def show 
    @album = Album.includes(:songs, :artist).find(params[:id])
    @artist = @album.artist
  end

  private

  def album_params
    params.require(:album).permit(:artist_id, :title, :duration, :release_date, :img_url)
  end

end
  