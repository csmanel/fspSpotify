import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
import { receivePlaylist } from '../../../store/audio/audioActions';
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
      dispatch(receivePlaylist(data));
    } else {
      console.log('error fetching playlist:', response.statusText);
    }
  };

  console.log(playlist);

  useEffect(() => {
    fetchPlaylist(id);
  }, [id]);

  if (!album) {
    return <p>loading playlist....</p>;
  }
  return (
    <div className="album-display">
      {/* image container? */}
      <div className="album-header">
        {/* <img src={magdalenaCover} alt="" className="album-art" /> */}
        <div className="header-text">
          <p className="label">playlist</p>
          <h1 className="album-text-header">{playlist.name}</h1>
          <p className="info">
            {album.artistName} &bull; {album.releaseDate.slice(0, 4)} &bull;
            {album.songs.length} songs
          </p>
        </div>
      </div>
      <div className="song-list">
        {album.songs?.map((song, trackNum) => (
          <>
            <ol className="track">
              <li className="track-number" key={trackNum}>
                {trackNum + 1}
              </li>
              {/* <img src={magdalenaCover} alt="" className="album-art" /> */}
              <li className="track-title">{song.name}</li>
            </ol>
            <p className="song-artist-name">{album.artistName}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
