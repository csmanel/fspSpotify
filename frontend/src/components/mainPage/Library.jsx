import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Library.css';
// import { fetchAlbums } from '../../store/album';
import { csrfFetch } from '../../store/csrf';
import { receiveAlbums } from '../../store/album';
import { Link } from 'react-router-dom';
import PlaylistIndex from '../playlist/PlaylistIndex';
import { receivePlaylists } from '../../store/playlist';

const Library = () => {
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const fetchAlbums = async () => {
    console.log('we are inside the album fetch');
    const response = await csrfFetch('/api/albums');

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAlbums(data.albums);
      dispatch(receiveAlbums(data));
    } else {
      console.error('Error fetching albums:', response.statusText);
    }
  };

  const fetchPlaylists = async () => {
    console.log('inside the playlist fetch');
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
    console.log('inside the use effect');
    fetchAlbums();
    fetchPlaylists();
  }, []);

  return (
    <div className="library-container">
      <h1>Your Libary</h1>

      <ul>
        {playlists.map((playlist) => (
          <div>
            <li key={playlist.id} className="album-box">
              {playlist.name}
            </li>
          </div>
        ))}
      </ul>

      <ul>
        {albums.map((album) => (
          <>
            <Link to={`/albums/${album.id}`} className="album-text">
              <li key={album.id} className="album-box">
                {album.title}
              </li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Library;
