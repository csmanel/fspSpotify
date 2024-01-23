import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchAlbum } from '../../../store/album';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';

const AlbumPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await csrfFetch(`/api/albums/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAlbum(data.album);
        debugger;
        dispatch(receiveAlbum(data));
      } else {
        console.log('error fetching album:', response.statusText);
      }
    };
    fetchAlbum();
  }, [id]);

  if (!album) {
    return <p>loading album....</p>;
  }
  return (
    <div>
      <h1>{album.title}</h1>
      <p>artist: {album.artistName}</p>
      <p>release date: {new Date(album.releaseDate).toLocaleDateString()}</p>
    </div>
  );
};

export default AlbumPage;
