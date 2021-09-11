const { id } = require("prelude-ls")

const player = {
    songs: [
      {
        id: 1,
        title: 'Vortex',
        album: 'Wallflowers',
        artist: 'Jinjer',
        duration: 242,
      },
      {
        id: 2,
        title: 'Vinda',
        album: 'Godtfolk',
        artist: 'Songleikr',
        duration: 160,
      },
      {
        id: 7,
        title: 'Shiroyama',
        album: 'The Last Stand',
        artist: 'Sabaton',
        duration: 213,
      },
      {
        id: 3,
        title: 'Thunderstruck',
        album: 'The Razors Edge',
        artist: 'AC/DC',
        duration: 292,
      },
      {
        id: 4,
        title: 'All is One',
        album: 'All is One',
        artist: 'Orphaned Land',
        duration: 270,
      },
      {
        id: 5,
        title: 'As a Stone',
        album: 'Show Us What You Got',
        artist: 'Full Trunk',
        duration: 259,
      },
    ],
    playlists: [
      { id: 1, name: 'Metal', songs: [1, 7, 4] },
      { id: 5, name: 'Israeli', songs: [4, 5] },
    ],
    playSong(song) {
        console.log(/* your code here */)
      },
    }
   
    



  
  
  function playSong(id) {
    if (typeof id === 'undefined') {
        return 'ID is invalid';
    
    }
    else {
       
      let songId = id;
      let obj = player.songs.find(obj => obj.id === songId);
      return 'Playing ' + obj.title + ' from ' + obj.album + ' by ' + obj.artist + ' | ' + obj.duration + '.';
    }
    }
    console.log(playSong(3));



  
  function removeSong(id) {
    if (typeof id === 'undefined') {
      return 'ID is invalid';
  }

  else {
    let songId2 = id;
    let obj2 = player.songs.find(obj2 => obj2.id === songId2);
    obj2.id = 'Removed';
    obj2.title = 'Removed';
    obj2.album = 'Removed';
    obj2.artist = 'Removed';
    obj2.duration = 'Removed';
    return player;
   }
  }
  console.log(removeSong(5));
     

    
     
    
   
    
     
  
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
  
