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
          <li>duration</li>
        </ol>
      </div>
      <div className="song-list">
        {playlist.songs?.map((song, trackNum) => (
          <>
            <ol className="track">
              <li className="track-number" key={trackNum}>
                {trackNum + 1}
              </li>
              <li className="track-title">{song.name}</li>
            </ol>
            <p className="song-artist-name">{playlist.artistName}</p>
            <ol className="trackAlbum">
              <li>{song.album.title}</li>
              <li>{song.duration}</li>
            </ol>
          </>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
