# README

# Introduction 

fspSpotify is a clone (wip) of popular music  streaming website Spotify. Users can login to listen to music stored in their library, create and delete playlists, as well as listen to other playlists by other users. 

# Technologies 

- Languages: Javascript, Ruby on Rails, HTML, CSS
- Libraries: React, Redux
- DataBase: PSQL

(not yet functional)
-Hosting: Render 
-Storage: AWS (S3)

# Functionality 

## Audio Player 

Users can play/pause, skip to previous and upcoming tracks. 
```js
 // handles play/pause
  useEffect(() => {
    if (toggleIsPlaying && audioRef.current.paused) {
      audioRef.current.play();
    }
    if (!toggleIsPlaying && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [toggleIsPlaying]);

  //handles next song
  const handleNextSong = () => {
    const nextIndex =
      (currentAlbum.songs.indexOf(currentSong) + 1) % currentAlbum.songs.length;
    const nextSong = currentAlbum.songs[nextIndex];

    dispatch(receiveSong(nextSong));

    if (!toggleIsPlaying) {
      dispatch(togglePlayPause);
    }
  };

  //handles previous song
  const handlePrevSong = () => {
    const prevIndex =
      (currentAlbum.songs.indexOf(currentSong) -
        1 +
        currentAlbum.songs.length) %
      currentAlbum.songs.length;
    const prevSong = currentAlbum.songs[prevIndex];

    dispatch(receiveSong(prevSong));

    if (!toggleIsPlaying) {
      dispatch(togglePlayPause);
    }
  };
```

# Features coming soon 

-Playlist Creation 
-Search bar
-Dynamic ALbum Show page
