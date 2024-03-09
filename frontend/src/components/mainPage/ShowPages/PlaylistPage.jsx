import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
import { receivePlaylist } from '../../../store/playlist';
import magdalenaCover from '../../../data/images/magdalenaCover.png';
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
      <div className="info-text">
        <ol>
          <li className="info-track-num">#</li>
          <li className="info-track-title">Title</li>
          <li className="info-track-album">Album</li>
          <li className="info-track-duration">Duration</li>
        </ol>
      </div>
      <div className="song-list">
        <div className="track">
          <ol>
            {playlist.songs?.map((song, index) => (
              <li key={index} onClick={() => handleAudioRef(song)}>
                <div className="song-index">{index + 1}</div>
                <img
                  src={song.album.imgUrl}
                  alt=""
                  className="show-album-art"
                />
                <div>
                  <ol>
                    <li>{song.name}</li>
                    <li>{song.album.artist.artistName}</li>
                  </ol>
                </div>
                <div className="album-title">{song.album.title}</div>
                <div>{song.duration}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
