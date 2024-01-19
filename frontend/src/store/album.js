import { csrfFetch } from './csrf';

const RECEIVE_ALBUMS = 'albums/receiveAlbums';

const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums,
});

export const fetchAlbums = () => async (dispatch) => {
  const response = await csrfFetch('/albums');
  if (response.ok) {
    const albums = await response.json();
    dispatch(receiveAlbums(albums));
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
        ...action.payload.reduce((albumsState, album) => {
          albumsState[album.id] = album;
          return albumsState;
        }, {}),
      };

    default:
      return state;
  }
};

export default albumReducer;
