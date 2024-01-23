import { csrfFetch } from './csrf';

const RECEIVE_ALBUMS = 'albums/receiveAlbums';
const RECEIVE_ALBUM = 'albums/receiveAlbum';

const receiveAlbums = (data) => ({
  type: RECEIVE_ALBUMS,
  albums: data.albums,
  artists: data.artists,
});

export const receiveAlbum = (data) => ({
  type: RECEIVE_ALBUM,
  album: data.album,
  artist: data.artist,
});

export const fetchAlbums = () => async (dispatch) => {
  const response = await csrfFetch('/albums');
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveAlbums(data));
  } else {
    console.error('Error fetching albums:', response.statusText);
  }
};

const initialState = {};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALBUMS:
      return {
        ...state,
        ...action.albums.reduce((albumsState, album) => {
          albumsState[album.id] = album;
          return albumsState;
        }, {}),
      };
    case RECEIVE_ALBUM:
      return {
        ...state,
        [action.album.id]: action.album,
      };

    default:
      return state;
  }
};

export default albumReducer;
