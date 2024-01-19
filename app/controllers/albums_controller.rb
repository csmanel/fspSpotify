class AlbumsController < ApplicationController

  def index 
    @albums = Album.includes(:songs, :artist).all 
  end

  def show 
    @album = Album.find(params[:id])
  end

  private 
    def album_params
      params.require(:album).permite(:artist_id, :title, :duration, :release_date)
    end
  end

end
