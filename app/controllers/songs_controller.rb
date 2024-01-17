class SongsController < ApplicationController
  
  def index 
    @songs = Song.includes(:album, :artist).all
    # need to define album and artist elsewhere
  end
  
  def show
    @song = Song.find(params[:id])
    render :show
  end

  private 

  def song_params
    params.require(:song).permit(:artist_id, :album_id, :duration, :track_num, :name)
  end

end