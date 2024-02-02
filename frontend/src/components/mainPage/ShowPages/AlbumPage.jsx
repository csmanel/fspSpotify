import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { receiveAlbum } from '../../../store/album';
import { csrfFetch } from '../../../store/csrf';
import magdalenaCover from '../../../data/images/magdalenaCover.png';
import caretakerCover from '../../../data/images/caretakerCover.jpg';
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
        <img src={magdalenaCover} alt="" className="album-art" />
        <div className="header-text">
          <p className="label">Album</p>
          <h1 className="album-text-header">{album.title}</h1>
          <p className="info">
            {album.artistName} &bull; {album.releaseDate.slice(0, 4)} &bull;{' '}
            {album.songs.length} songs
          </p>
        </div>
      </div>
      <div className="song-list">
        {album.songs?.map((song, trackNum) => (
          <>
            <ol className="track">
              <li className="track-number" key={trackNum}>
                {trackNum + 1}
              </li>
              {/* <img src={magdalenaCover} alt="" className="album-art" /> */}
              <li className="track-title">{song.name}</li>
            </ol>
            <p className="song-artist-name">{album.artistName}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
