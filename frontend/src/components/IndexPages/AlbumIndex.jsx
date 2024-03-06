import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { receiveAlbums } from '../../store/album';
import { csrfFetch } from '../../store/csrf';

const AlbumIndex = () => {
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    const response = await csrfFetch('/api/albums');

    if (response.ok) {
      const data = await response.json();
      setAlbums(data.albums);
      dispatch(receiveAlbums(data));
    } else {
      console.error('Error fetching albums:', response.statusText);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <ul>
        {albums.map((album) => (
          <Link to={`/albums/${album.id}`} className="album-text">
            <li key={album.id} className="album-box">
              {album.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AlbumIndex;
