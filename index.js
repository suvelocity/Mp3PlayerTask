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
     

    
     
    

  function addSong(title1, album1, artist1, duration1, id1) {
    player.songs.push ({
      id: id1 || Math.floor(Math.random() * 1000000000000000000000),
      title: title1,
      album: album1,
      artist: artist1,
      duration: duration1,
    });
    return player;
  }

  console.log(addSong('Sundress', 'Sundress', 'ASAP Rocky', '2:38', 7));


  function removePlaylist(id) {
    if (typeof id === 'undefined') {
      return 'ID is invalid';
  }

  else {
  let songId3 = id;
  let obj3 = player.playlists.find(obj3 => obj3.id === songId3);
  obj3.id = 'removed';
  obj3.name = 'removed';
  obj3.songs = 'removed';
  return player;
}
}

console.log(removePlaylist());
  
  

  function createPlaylist(name1, id1) {
    let playlistId1 = id1 || Math.floor(Math.random() * 1000000000000000000000);
    player.playlists.push ({
    id: playlistId1, name: name1, songs:[object]
  });
  return playlistId1;
}


console.log(createPlaylist('jazz', 2))
  
  
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
  
