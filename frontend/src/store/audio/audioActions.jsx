export const RECEIVE_SONG = 'songs/RECEIVE_SONG';
export const RECEIVE_SONGS = 'songs/RECEIVE_SONGS';
export const RECEIVE_ARTIST = 'songs/RECEIVE_ARTIST';
export const RECEIVE_ALBUM = 'songs/RECEIVE_ALBUM';
export const RECEIVE_ALBUMS = 'songs/RECEIVE_ALBUMS';
export const RECEIVE_PLAYLIST = 'songs/RECEIVE_PLAYLIST';
export const TOGGLE_PLAY_PAUSE = 'songs/TOGGLE_PLAY_MUSIC';
export const TOGGLE_SHUFFLE = 'songs/TOGGLE_SHUFFLE';
export const PLAY_NEXT = 'songs/PLAY_NEXT';
export const PLAY_PREVIOUS = 'songs/PLAY_PREVIOUS';
export const CLEAR_QUEUE = 'songs/CLEAR_QUEUE';
export const SET_QUEUE = 'songs/SET_QUEUE';
export const SET_VOLUME = 'songs/SET_VOLUME';
export const SET_CURRENT_SONG = 'songs/SET_CURRENT_SONG';

export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  song,
});
export const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  songs,
});
export const receiveArtist = (artist) => ({
  type: RECEIVE_ARTIST,
  artist,
});
export const receiveAlbum = (data) => ({
  type: RECEIVE_ALBUM,
  album: data.album,
  artist: data.artist,
});
export const receiveAlbums = (albums) => ({
  type: RECEIVE_ALBUMS,
  albums,
});
export const receivePlaylist = (playlist) => ({
  type: RECEIVE_PLAYLIST,
  playlist,
});
export const togglePlayPause = () => ({
  type: TOGGLE_PLAY_PAUSE,
});
export const toggleShuffle = () => ({
  type: TOGGLE_SHUFFLE,
});
export const playNext = () => ({
  type: PLAY_NEXT,
});
export const playPrevious = () => ({
  type: PLAY_PREVIOUS,
});
export const clearQueue = () => ({
  type: CLEAR_QUEUE,
});
export const setQueue = (queue) => ({
  type: SET_QUEUE,
  queue,
});
export const setVolume = (volume) => ({
  type: SET_VOLUME,
  volume,
});
export const setCurrentSong = (song) => ({
  // console.log('Current Song being set', song)
  type: SET_CURRENT_SONG,
  song,
});
