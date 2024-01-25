import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';

const AlbumPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  const fetchAlbum = async (id) => {
    const response = await csrfFetch(`/api/albums/${id}`);
    if (response.ok) {
      const data = await response.json();
      setAlbum(data.album);
      dispatch(receiveAlbum(data));
    } else {
      console.log('error fetching album:', response.statusText);
    }
  };

  useEffect(() => {
    fetchAlbum(id);
  }, [id]);

  if (!album) {
    return <p>loading album....</p>;
  }
  return (
    <div className="album-display">
      {console.log(album)}
      <div className="album-header">
        <p>{album.title}</p>
        <p>{album.artistName}</p>
        <p>{album.releaseDate}</p>
      </div>
      {album.songs?.map((song, trackNum) => (
        //this key is a placeholder so that im not getting errors
        <div key={trackNum}>
          <div className="song-list">
            <p>{song.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumPage;
