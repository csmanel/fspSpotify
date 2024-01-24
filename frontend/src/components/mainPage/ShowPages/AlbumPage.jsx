import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchAlbum } from '../../../store/album';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';

const AlbumPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await csrfFetch(`/api/albums/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAlbum(data.album);
        dispatch(receiveAlbum(data));
      } else {
        console.log('error fetching album:', response.statusText);
      }
    };
    fetchAlbum();
  }, [id]);

  // const { title, releaseDate, artistName, songs } = album;

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

      {/* header in sptofiy that contains track name/album name */}
      {/* 
      <h1>{album.title}</h1>
      <p>artist: {album.artistName}</p>
      <p>release date: {new Date(album.releaseDate).toLocaleDateString()}</p> */}
    </div>
  );
};

export default AlbumPage;
