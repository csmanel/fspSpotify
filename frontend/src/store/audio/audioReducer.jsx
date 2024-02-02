import {
  RECEIVE_SONG,
  RECEIVE_SONGS,
  RECEIVE_ARTIST,
  RECEIVE_ALBUM,
  RECEIVE_ALBUMS,
  RECEIVE_PLAYLIST,
  TOGGLE_PLAY_PAUSE,
  TOGGLE_SHUFFLE,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  CLEAR_QUEUE,
  SET_QUEUE,
  SET_VOLUME,
  SET_CURRENT_SONG,
} from './audioActions';

const initialState = {
  currentSong: null,
  currentAlbum: {},
  currentPlaylist: {},
  currentArtist: {},
  toggleIsPlaying: false,
  queue: [],
  toggleShuffle: false,
  songHistory: [],
  volume: 0,
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    //do i need this?
    case RECEIVE_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    case RECEIVE_ARTIST:
      return {
        ...state,
        currentArtist: action.payload,
      };
    case RECEIVE_ALBUM:
      return {
        ...state,
        currentAlbum: action.payload,
      };
    case RECEIVE_ALBUMS:
      return {
        ...state,
        albums: action.payload,
      };
    case RECEIVE_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
      };
    case TOGGLE_PLAY_PAUSE:
      return {
        ...state,
        toggleIsPlaying: !state.toggleIsPlaying,
      };
    case TOGGLE_SHUFFLE:
      return {
        ...state,
        toggleShuffle: !state.toggleShuffle,
      };
    case PLAY_NEXT:
      () => {
        const [currentSong, ...remainingQueue] = state.queue;
        return {
          ...state,
          currentSong: currentSong || {},
          queue: remainingQueue,
        };
      };
      break;
    case PLAY_PREVIOUS:
      (() => {
        const currentIndex = state.queue.indexOf(state.currentSong);
        const previousIndex = currentIndex - 1;
        const previousSong = state.queue[previousIndex] || {};
        return {
          ...state,
          currentSong: previousSong,
        };
      })();
      break;
    // case CHANGE_TRACK:
    //   const indexChange = action.payload === 'next' ? 1 : -1;
    //   const newIndex =
    //     (state.currentTrackIndex + indexChange + state.queue.length) %
    //     state.queue.length;
    //   return { ...state, currentTrackIndex: newIndex };
    case CLEAR_QUEUE:
      return {
        ...state,
        queue: [],
      };
    case SET_QUEUE:
      return {
        ...state,
        queue: action.payload,
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export default audioReducer;
