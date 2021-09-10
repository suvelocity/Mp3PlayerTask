'use strict'

//PLAYLISTS FUNCTIONS: GETING , EDITING & CALCULATIONS FOR PLAYLISTS.


   //get playlists


   function isIdExsistInPlayLists(id) {//gets: PLAYLISTS ID , returns: IS PLAYLIST ID EXSIST.
    for (let i = 0; i < player.playlists.length; i++) {
      if (player.playlists[i]['id'] === id) return true
    }
    return false
  }
  
  function playListById(id) {//gets: PLAYLIST ID , returns: THE MATCHING PLAYLIST.
    for (let i = 0; i < player.playlists.length; i++) {
      if (player.playlists[i]['id'] === id) return player.playlists[i]
    }
    return undefined
  }
  
  function playListIndexById(id) {//gets: PLAYLIST ID , returns: PLAYLIST INDEX.
    for (let i = 0; i < player.playlists.length; i++) {
      if (player.playlists[i]['id'] === id) return i
    }
    return -1
  }
  
  
     //editing playlists
  
  
  function addToPlayList(songId, playlistId) {//gets: SONG ID & PLAYLIST ID --> ADDS SONG TO PLAYLIST.
    let song = songById(songId)
    player.playlists[playListIndexById(playlistId)].songs.push(song.id)
  }
  
  function removeFromPlayLists(songId) {//gets: SONG ID --> REMOVES IT FROM *ALL* PLAYLISTS.
    for (let i = 0; i < player.playlists.length; i++) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        if (player.playlists[i].songs[j] === songId) {
          player.playlists[i].songs.splice(j, 1)
        }
      }
    }
  }
  
  function removeFromPlayList(songId, playlistId) {//gets: SONG ID & PLAYLIST ID --> REMOVES SONG FROM PLAYLIST.
    for (let i = 0; i < playListById(playlistId).songs.length; i++) {
      if (player.playlists[playListIndexById(playlistId)].songs[i] === songId) {
        player.playlists[playListIndexById(playlistId)].songs.splice(i, 1)
      }
    }
  }
  
  function removePlaylist(id) {//gets: PLAYLIST ID --> REMOVES PLAYLIST FROM PLAYER.
    if (playListIndexById(id) === -1) {
      throw new Error('non-existent ID')
    }
    player.playlists.splice(playListIndexById(id), 1)
  }
  
  function createPlaylist(name, id = 0) {//gets: NEW PLAYLIST'S NAME --> ADDS NEW EMPTY PLAYLIST TO PLAYER , returns: NEW PLAYLIST ID.
    let newPlayList = { name, songs: [] }
    if (!playListById(id)) newPlayList.id = id
    else {
      for (let i = 0; i < player.playlists.length + 1; i++) {
        if (!isIdExsistInPlayLists(i)) {
          newPlayList.id = i
        }
      }
      throw new Error(`existent ID,the chosen id is ${newPlayList.id}`)
    }
    player.playlists.push(newPlayList)
    return newPlayList.id
  }
  
  
  
      /*gets: SONG ID & PLAILIST ID --> EDITING PLAYLIST BY:
  
      IF --> SONG ID EXSIST IN PLAYLIST : REMOVES SONG FROM PLAYLIST. 
  
      IF --> ONLY SONG IN PLAYLIST : DELETES PLAYLIST. 
  
      IF --> PLAYLIST DO NOT CONTAINS SONG : ADDS SONG TO PLAYLIST.*/
  
  function editPlaylist(playlistId, songId) {
    if (playListById(playlistId) === undefined) {
      throw new Error('non-existent playlistId')
    }
    if (songById(songId) === undefined) {
      throw new Error('non-existent songId')
    }
    let playlist = playListById(playlistId)
    if (playlist.songs.includes(songId) && playlist.songs.length === 1)
      removePlaylist(playlistId)
    else if (playlist.songs.includes(songId) && playlist.songs.length !== 1) {
      removeFromPlayList(songId, playlistId)
    } else if (!playlist.songs.includes(songId)) {
      addToPlayList(songId, playlistId)
    }
  }
  
  
      //calculations
  
  
  function playlistDuration(id) {//gets: PLAYLIST ID, returns: PLAYLIST DURATION.
    if (playListById(id) === undefined) {
      throw new Error('non-existent playlistId')
    }
    const playlist = playListById(id)
    let sum = 0
    for (let i = 0; i < playlist.songs.length; i++) {
      let song = songById(playlist.songs[i])
      sum += song.duration
    }
    return sum
  }
  