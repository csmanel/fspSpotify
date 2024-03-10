import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
import { receivePlaylists } from '../../../store/playlist';
import './YourPlaylist.css';

const YourPlaylists = () => {
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState(null);

  const fetchPlaylists = async () => {
    const response = await csrfFetch('/api/playlists');

    if (response.ok) {
      const data = await response.json();
      setPlaylists(data);
      dispatch(receivePlaylists(data));
    } else {
      console.error('Error fetching playlists:', response.statusText);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  if (!playlists) {
    return console.log('error, no playlist found');
  }

  return (
    <div className="card-index">
      <h1>Your Playlists</h1>

      <ul className="playlist-card-container">
        {playlists.map((playlist) => (
          <Link
            to={`/playlists/${playlist.id}`}
            className="playlist-card"
            style={{ textDecoration: 'none' }}
            key={playlist.id}
          >
            <div className="card-items">
              <img src={playlist.imgUrl} alt="" className="playlist-card-img" />
              <li key={playlist.id}>{playlist.name}</li>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default YourPlaylists;
