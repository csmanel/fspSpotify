import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';
import './AlbumPage.css';

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

  console.log(album);

  useEffect(() => {
    fetchAlbum(id);
  }, [id]);

  if (!album) {
    return <p>loading album....</p>;
  }
  return (
    <div className="album-display">
      {/* image container? */}
      <div className="album-header">
        <p>Album</p>
        <h1>{album.title}</h1>
        <p>
          {album.artistName}
          {album.releaseDate.slice(0, 4)}
          {album.length}
        </p>
        <img src={album.img} alt="" />
      </div>
      <div className="song-list">
        {album.songs?.map((song, trackNum) => (
          <>
            <ol>
              <li key={trackNum}>{trackNum + 1}</li>
              <li>{song.name}</li>
            </ol>
            <p>{album.artistName}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
