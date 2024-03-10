import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { csrfFetch } from '../../../store/csrf';
import { receiveAlbums } from '../../../store/album';
import { Link, useParams } from 'react-router-dom';
import './HomePage.css';
import YourPlaylists from './YourPlaylists';

const HomePage = () => {
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
    <div className="home-page-container">
      <div className="home-album-grid">
        <ul>
          {albums.slice(0, 8).map((album) => (
            <Link
              to={`/albums/${album.id}`}
              style={{ textDecoration: 'none' }}
              key={album.id}
              className="home-album-card"
            >
              <img src={album.imgUrl} alt="" className="home-index-art" />
              <div className="album-text">
                <li key={album.id}>{album.title}</li>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <YourPlaylists />
    </div>
  );
};

export default HomePage;
