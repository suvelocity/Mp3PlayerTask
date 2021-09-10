'use strict'

//SONGS FUNCTIONS: GETING & EDITING SONGS.


   //Get songs by:


   function songById(id) {//gets: SONG ID, returns: THE MATCHING SONG.
    for (let i = 0; i < player.songs.length; i++) {
      if (player.songs[i]['id'] === id) return player.songs[i]
    }
    return undefined
  }
  
  function songIndexById(id) {//gets: SONG ID, returns: SONG INDEX.
    for (let i = 0; i < player.songs.length; i++) {
      if (player.songs[i]['id'] === id) return i
    }
    return -1
  }
  
  function isIdExsistInSongs(id) {//gets: SONG ID, returns: IS SONG ID EXSIST.
    for (let i = 0; i < player.songs.length; i++) {
      if (player.songs[i]['id'] === id) return true
    }
    return false
  }
  
  
     //Edit songs
  
  
  function removeSong(id) {//gets: SONG ID --> REMOVING THE SONG, FROM PLAYER & PLAYLIST (activatie remove-from-playilist function).
    if (songIndexById(id) === -1) {
      throw new Error('non-existent ID')
    }
    player.songs.splice(songIndexById(id), 1)
    removeFromPlayLists(id)
  }
  
  function addSong(title, album, artist, duration, id = 0) {//gets: NEW SONG CHARACTERIZATION --> ADDS IN TO PLAYER ,returns: NEW SONGS ID.
    const newSong = { title, album, artist, duration: mmssTOs(duration) }
    if (!isIdExsistInSongs(id)) newSong.id = id
    else {
      for (let i = 0; i < player.songs.length + 1; i++) {
        if (!isIdExsistInSongs(i)) {
          newSong.id = i
        }
      }
      throw new Error(`existent ID,the chosen id is ${newSong.id}`)
    }
    player.songs.push(newSong)
    return newSong.id
  }
  
  