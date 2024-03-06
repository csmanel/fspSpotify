import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
      <ul>
        {playlists.map((playlist) => (
          <div>
            <Link to={`/playlists/${playlist.id}`} className="album-text">
              <li key={playlist.id} className="album-box">
                {playlist.name}
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistIndex;
