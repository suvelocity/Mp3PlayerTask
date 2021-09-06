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
    const songObj = this.fingObjectByID(song);
    // If not exists
    if(songObj === undefined){
      throw ("non existent ID")
    }
    else{
      console.log("Playing " + songObj.title + " from " + songObj.album + " by " + songObj.artist + " | " + player.calcPlayTime(songObj.duration) + ".");
    }
  },

  // ===> Reformat from seconds to MM:SS <===
  calcPlayTime(durationTime) {
    const min = Math.floor(durationTime / 60);
    const sec = durationTime - min * 60;
    // Should add 0 before the number?   numberS = number as string    
    const numberS1 = (min < 10) ? "0" : "";
    const numberS2 = (sec < 10) ? "0" : "";
    return numberS1 + min + ":" + numberS2 + sec;
  },

  // ===> Returns the song by the ID given <===
  fingObjectByID(id){
    return player.songs.find(songObj => songObj.id === id);
  }
}

function playSong(id) {
  player.playSong(id);
}

function removeSong(id) {
  const songObj = player.fingObjectByID(id);
  // If ID does not exists
  if(songObj === undefined){
    throw ("non existent ID");
  }
  // If ID does exists - remove
  else{
    // Remove from songs
    player.songs.forEach((songObj, index) => {
      if(songObj.id === id)
        player.songs.splice(index, 1);
    });    
    
    // Remove from playlist
    player.playlists.forEach(playlistObj => {
      const index = playlistObj.songs.indexOf(id)
      if(index > -1){
        playlistObj.songs.splice(index, 1);
      }
    });
  }
}


// Params:      String  String String    MM:SS  Optional
function addSong(title, album, artist, duration, id) {
  
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
