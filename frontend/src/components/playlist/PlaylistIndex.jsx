import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { receivePlaylists, fetchPlaylist } from '../../store/playlist';
import { useParams } from 'react-router-dom';
import { login } from '../../store/session';
import { csrfFetch } from '../../store/csrf';
import { receivePlaylists } from '../../store/playlist';

const PlaylistIndex = () => {
  const dispatch = useDispatch();
  // const playlists = useSelector((state) => {});

  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  const fetchPlaylist = async (id) => {
    console.log('we are inside the fetch for the playlist !!!!!!!!!');
    const response = await csrfFetch(`/api/playlists/${id}`);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setPlaylist(data.playlist);
      dispatch(receivePlaylists(data));
    } else {
      console.log('error fetching playlist:', response.statusText);
    }
  };

  useEffect(() => {
    fetchPlaylist(id);
  }, [id]);

  if (!playlist) {
    return console.log('error, no playlist found');
  }

  return (
    <div>
      <p>{playlist.id}</p>
    </div>
  );
};

export default PlaylistIndex;
