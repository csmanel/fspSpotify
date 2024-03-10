import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
import { receivePlaylist } from '../../../store/playlist';
import { formatDuration } from '../../helpers/durationConverter';
import './AlbumPage.css';

const PlaylistPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const audioRef = useRef(null);

  const fetchPlaylist = async (id) => {
    const response = await csrfFetch(`/api/playlists/${id}`);

    if (response.ok) {
      const data = await response.json();
      setPlaylist(data.playlist);
      dispatch(receivePlaylist(data.playlist));
    } else {
      console.log('error fetching playlist:', response.statusText);
    }
  };

  useEffect(() => {
    fetchPlaylist(id);
  }, [id]);

  if (!playlist) {
    return <p>loading playlist....</p>;
  }

  const handleAudioRef = (i) => {
    if (audioRef.current) {
      audioRef.current.src = playlist.songs[i].audioUrl;
      audioRef.current.play();
    }
  };

  return (
    <div className="album-display">
      <div className="album-header">
        <img src={playlist.imgUrl} alt="" className="album-art" />
        <div className="header-text">
          <p className="label">playlist</p>
          <h1 className="album-text-header">{playlist.name}</h1>
          <p className="info">
            {playlist.name} &bull; {playlist.songs.length} songs
          </p>
        </div>
      </div>
      <div className="playlist-grid-container">
        <div className="grid-header">#</div>
        <div className="grid-header">Title</div>
        <div className="grid-header">Album</div>
        <div className="grid-header">Duration</div>
        {playlist.songs?.map((song, index) => (
          <div className="track">
            {/* <li key={index} onClick={() => handleAudioRef(song)}> */}
            <div className="song-track">{index + 1}</div>
            <div className="playlist-song-details">
              <img src={song.album.imgUrl} alt="" className="show-album-art" />
              <div className="song-detail-container">
                <div>{song.name}</div>
                <div className="artist-name">
                  {song.album.artist.artistName}
                </div>
              </div>
            </div>
            <div className="album-title">{song.album.title}</div>
            <div className="song-duration">{formatDuration(song.duration)}</div>
            {/* </li> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
