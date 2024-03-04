import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
import { receivePlaylist } from '../../../store/playlist';
import './AlbumPage.css';

const PlaylistPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = async (id) => {
    const response = await csrfFetch(`/api/playlists/${id}`);

    if (response.ok) {
      const data = await response.json();
      console.log('inside the response, here is your data:', data);
      setPlaylist(data);
      dispatch(receivePlaylist(data));
    } else {
      console.log('error fetching playlist:', response.statusText);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchPlaylist(id);
  }, [id]);

  if (!playlist) {
    return <p>loading playlist....</p>;
  }

  console.log(playlist);
  return (
    <div className="album-display">
      <div className="album-header">
        <div className="header-text">
          <p className="label">playlist</p>
          <h1 className="album-text-header">{playlist.name}</h1>
          <p className="info">
            {/* {playlist.artistName} &bull; {playlist.releaseDate.slice(0, 4)}{' '}
            &bull;
            {playlist.songs.length} songs */}
          </p>
        </div>
      </div>{' '}
      {/* <div className="song-list">
        {playlist.songs?.map((song, trackNum) => (
          <>
            <ol className="track">
              <li className="track-number" key={trackNum}>
                {trackNum + 1}
              </li>
              <li className="track-title">{song.name}</li>
            </ol>
            <p className="song-artist-name">{playlist.artistName}</p>
          </>
        ))}
      </div> */}
    </div>
  );
};

export default PlaylistPage;
