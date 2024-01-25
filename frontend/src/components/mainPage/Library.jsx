import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Library.css';
// import { fetchAlbums } from '../../store/album';
import { csrfFetch } from '../../store/csrf';
import { receiveAlbums } from '../../store/album';
import { Link } from 'react-router-dom';

const Library = () => {
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);

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

  useEffect(() => {
    console.log('inside the use effect');
    fetchAlbums();
  }, []);

  return (
    <div className="library-container">
      <h1>Your Libary</h1>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          // <li key={album.id}>{album.title}</li>
          <Link to={`/albums/${album.id}`}>{album.title}</Link>
        ))}
      </ul>
    </div>
  );
};

export default Library;
