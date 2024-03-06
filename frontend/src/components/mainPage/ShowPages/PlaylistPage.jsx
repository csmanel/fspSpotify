import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
import { receivePlaylist } from '../../../store/playlist';
import magdalenaCover from '../../../data/images/magdalenaCover.png';

import './AlbumPage.css';

const PlaylistPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

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

  return (
    <div className="album-display">
      <div className="album-header">
        <img src={magdalenaCover} alt="" className="album-art" />
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
          <li>#</li>
          <li>Title</li>
          <li>Album</li>
          <li>Duration</li>
        </ol>
      </div>
      <div className="song-list">
        <div className="track">
          <ol>
            {playlist.songs?.map((song, index) => (
              <li key={index}>
                <div>{index + 1}</div>
                <img src={magdalenaCover} alt="" className="show-album-art" />
                <div>
                  <ol>
                    <li>{song.name}</li>
                    <li>{song.album.artist.artistName}</li>
                  </ol>
                </div>
                <div>{song.album.title}</div>
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
