import { csrfFetch } from './csrf';

// const RECEIVE_ARTISTS = 'artists/receiveArtists';
const RECEIVE_ARTIST = 'artists/receiveArtist';
const RECEIVE_ARTISTS = 'artists/receiveArtists';
const RECEIVE_ALBUMS = 'albums/receiveAlbums';
const RECEIVE_ALBUM = 'albums/receiveAlbum';

const receiveArtists = (artists) => ({
  type: RECEIVE_ARTISTS,
  artists,
});

const receiveArtist = (artist) => ({
  type: RECEIVE_ARTIST,
  artist,
});

export const fetchArtists = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/artists');
    const artists = await response.json();
    dispatch(receiveArtists(artists));
  } catch (error) {
    console.error('Error fetching artists:', error);
  }
};

export const fetchArtist = (artistId) => async (dispatch) => {
  const response = await csrfFetch(`/artists/${artistId}`);

  if (response.ok) {
    const artist = await response.json();
    dispatch(receiveArtist(artist));
  } else {
    console.error('Error fetching artist:', response.statusText);
  }
};

const initialState = {};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARTISTS:
      return {
        ...state,
        ...action.payload.reduce((artistsState, artist) => {
          artistsState[artist.id] = artist;
          return artistsState;
        }, {}),
      };

    case RECEIVE_ARTIST:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case RECEIVE_ALBUMS:
      return {
        ...state,
        ...action.artists.reduce((artistState, artist) => {
          artistState[artist.id] = artist;
          return artistState;
        }, {}),
      };
    case RECEIVE_ALBUM:
      return {
        ...state,
        [action.artist.id]: action.artist,
      };

    default:
      return state;
  }
};

export default artistReducer;
