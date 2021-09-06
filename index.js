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
  },

  // ===> Returns the playlist by the ID given <===
  fingObjectPlaylistByID(id){
    return player.playlists.find(songObj => songObj.id === id);
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
  // If ID is not a number
  else if(isNaN(id)){
    throw "ID must be a number";
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


// ===> Convert MM:SS to Seconds <===
function from_Time_String_To_Seconds(duration){
  const newDuration = duration.split(":")
  return parseInt(newDuration[0]) * 60 + parseInt(newDuration[1]);
}

// ===> Generate a new ID to songs <===
function generate_ID(songOrPlaylist){
  let i = 1
  while(songOrPlaylist === "song"){
    const songObj = player.fingObjectByID(i);
    // If ID does not exists
    if(songObj === undefined){      
      return i;
    } 
    i++;
  }

  // ===> Generate a new ID to playlist <===
  while(songOrPlaylist === "playlist"){
    const playlistObj = player.fingObjectPlaylistByID(i);
    // If ID does not exists
    if(playlistObj === undefined){      
      return i;
    } 
    i++;
  }
}


// Params:      String  String String    MM:SS  Optional
function addSong(title, album, artist, duration, id) {
  const newDuration = from_Time_String_To_Seconds(duration);  

  //Check if ID is already exits
  if(player.fingObjectByID(id) !== undefined){
    throw "That ID has been taken";   
  }  

  // If ID doesnt omitted - generate ID
  if(id === undefined){
    id = generate_ID("song")
  }
  else{
    // Checks If ID is a string
    if(isNaN(id)){
      throw "ID must be a number";
    }
  }

  player.songs.push({
    title: title,
    album: album,
    duration: newDuration,    
    artist: artist, 
    id: id   
  });

  // Return ID
  return id;
}


function removePlaylist(id) {
  if(player.fingObjectPlaylistByID(id) === undefined){
    throw "non existent ID";
  }
  // If ID is not a number
  else if(isNaN(id)){
    throw "ID must be a number";
  }
  else{
    // Removes from playlist
    player.playlists.forEach((playlistObj, index) => {
      if(playlistObj.id === id)
        player.playlists.splice(index, 1);
    });    
  }   
}

function createPlaylist(name, id) {
  //Check if ID is already exits
  if(player.fingObjectPlaylistByID(id) !== undefined){
    throw "That ID has been taken";   
  };

  // If ID doesnt omitted - generate ID
  if(id === undefined){
    id = generate_ID("playlist");
  }
  else{
    // Checks If ID is a string
    if(isNaN(id)){
      throw "ID must be a number";
    }
  }

  player.playlists.push({
    id :id,
    name: name,
    songs: []
  });

  //Return ID
  return id;
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
