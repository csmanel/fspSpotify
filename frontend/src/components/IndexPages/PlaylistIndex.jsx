import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { receivePlaylists } from '../../store/playlist';
import '../mainPage/Library.css';

const PlaylistIndex = () => {
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
    <div>
      <ul className="library-index-item">
        {playlists.map((playlist) => (
          <Link
            to={`/playlists/${playlist.id}`}
            className="album-box"
            style={{ textDecoration: 'none' }}
            key={playlist.id}
          >
            <img src={playlist.imgUrl} alt="" className="index-art" />
            <div className="album-text">
              <li key={playlist.id}>{playlist.name}</li>
              <p>Playlist</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistIndex;
