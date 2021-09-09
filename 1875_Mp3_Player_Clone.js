const player = { //object of the 1875 mp3 player clone
    songs: [
      {
        id: 1,
        title: 'Boys and Girls',
        album: 'CTV3',
        artist: 'Jaden',
        duration: 223
      },
      {
        id: 2,
        title: 'Dejanbem',
        album: 'Haitian Boy Kodak',
        artist: 'Kodak Black',
        duration: 214
      },
      {
        id: 7,
        title: 'Identity_Theft',
        album: 'Dying To Live',
        artist: 'Kodak Black',
        duration: 148
      },
      {
        id: 3,
        title: 'Gnarly',
        album: 'Dying To Live',
        artist: 'Kodak Black feat. Lil Pump',
        duration: 214
      },
      {
        id: 4,
        title: 'Freaky Girl',
        album: 'I AM YOU',
        artist: 'YNW Melly',
        duration: 215
      },
      {
        id: 5,
        title: 'Betrayal',
        album: 'Trip At Knight',
        artist: 'Trippie Redd feat. Drake',
        duration: 151
      },
    ],
    playlists: [
      { id: 1, name: 'Hip-Hop', songs: [1, 3, 4] },
      { id: 5, name: 'Rap', songs: [2, 7, 5] },
    ],
    playSong(song) {
      console.log(/* your code here */)
    },
  }
  
  function playSong(id) {
    // your code here
  }
  
  function removeSong(id) {
    // your code here
  }
  
  function addSong(title, album, artist, duration, id) {
    // your code here
  }
  
  function removePlaylist(id) {
    // your code here
  }
  
  function createPlaylist(name, id) {
    // your code here
  }
  
  function playPlaylist(id) {
    // your code here
  }
  
  function editPlaylist(playlistId, songId) {
    // your code here
  }
  
  function playlistDuration(id) {
    // your code here
  }
  
  function searchByQuery(query) {
    // your code here
  }
  
  function searchByDuration(duration) {
    // your code here
  }
  
  module.exports = {
    player,
    playSong,
    removeSong,
    addSong,
    removePlaylist,
    createPlaylist,
    playPlaylist,
    editPlaylist,
    playlistDuration,
    searchByQuery,
    searchByDuration,
  }