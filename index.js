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
    const songObj = this.findSongByID(song);
    if(isNaN(song)){
      throw "ID must be a number";
    }
    // If not exists
    else if(songObj === undefined){
      throw ("non existent ID")
    }
    else{
      console.log("Playing " + songObj.title + " from " + songObj.album + " by " + songObj.artist + " | " + calcPlayTime(songObj.duration) + ".");
    }
  },

  // ===> Returns the song by the ID given <===
  findSongByID(id){
    return player.songs.find(songObj => songObj.id === id);
  },

  // ===> Returns the playlist by the ID given <===
  findPlaylistByID(id){
    return player.playlists.find(songObj => songObj.id === id);
  }
}

function playSong(id) {
  player.playSong(id);
}

function removeSong(id) {
  const songObj = player.findSongByID(id);
  // If ID is not a number
  if(isNaN(id)){
    throw "ID must be a number";
  }
  // If ID does not exists
  else if(songObj === undefined){
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


// ===> Convert MM:SS to Seconds <===
function from_Time_String_To_Seconds(duration){
  const newDuration = duration.split(":")
  return parseInt(newDuration[0]) * 60 + parseInt(newDuration[1]);
}

// ===> Reformat from seconds to MM:SS <===
function calcPlayTime(durationTime) {
  const min = Math.floor(durationTime / 60);
  const sec = durationTime - min * 60;
  // Should add 0 before the number?   numberS = number as string    
  const numberS1 = (min < 10) ? "0" : "";
  const numberS2 = (sec < 10) ? "0" : "";
  return numberS1 + min + ":" + numberS2 + sec;
}

// ===> Generate a new ID <===
function generate_ID(songOrPlaylist){
  let i = 1
  // To Songs
  while(songOrPlaylist === "song"){
    const songObj = player.findSongByID(i);
    // If ID does not exists
    if(songObj === undefined){      
      return i;
    } 
    i++;
  }

  // To Playlist
  while(songOrPlaylist === "playlist"){
    const playlistObj = player.findPlaylistByID(i);
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
  if(player.findSongByID(id) !== undefined){
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
  // If ID is not a number
  if(isNaN(id)){
    throw "ID must be a number";
  }
  else if(player.findPlaylistByID(id) === undefined){
    throw "non existent ID";
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
  if(isNaN(id)){
    throw "ID must be a number";
  }
  if(player.findPlaylistByID(id) !== undefined){
    throw "That ID has been taken";   
  };
  // If ID doesnt omitted - generate ID
  if(id === undefined){
    id = generate_ID("playlist");
  }
  

  player.playlists.push({
    id :id,
    name: name,
    songs: []
  });
  
  return id;
}

function playPlaylist(id) {
  const playlistObj = player.findPlaylistByID(id);  
  if(isNaN(id)){
    throw "ID must be a number";
  }  
  else if(playlistObj === undefined){
    throw "non existent ID";
  }
  else{
    playlistObj.songs.forEach(song => playSong(song));
  }
}


function editPlaylist(playlistId, songId) {
  const myPlaylist = player.findPlaylistByID(playlistId);
  const song  = player.findSongByID(songId);
  if(isNaN(playlistId)){
    throw "playlist ID must be a number";
  }
  else if(isNaN(songId)){
    throw "song ID must be a number";
  }
  else if(myPlaylist === undefined){
    throw "playlist dosent exists";
  }
  else if(song === undefined){
    throw "song dosent exists";
  }
  else{
    //If Song ID exists - remove
    if(myPlaylist.songs.find(song => song === songId) === songId){
      const index = myPlaylist.songs.indexOf(songId);
      if(index > -1){
        myPlaylist.songs.splice(index, 1);
        //If it was the last song in the playlist - delete playlist
        if(myPlaylist.songs.length === 0){
          removePlaylist(playlistId);
        }
      }        
    }
    //If Song ID doesnt exists - add
    else{
      myPlaylist.songs.push(songId);       
    }
  }
}

function playlistDuration(id) {
  const myPlaylist = player.findPlaylistByID(id);
  
  if(isNaN(id)){
    throw "playlist ID must be a number";
  }
  else if(myPlaylist === undefined){
    throw "playlist dosent exists";
  }  
  else{
    let durationInSeconds = 0;
    myPlaylist.songs.forEach(song => {
      const songObj = player.findSongByID(song);
      durationInSeconds += songObj.duration;
    });
    return durationInSeconds;
  }
}

function searchByQuery(query) {
  const newQuery  = query.toLowerCase();
  const objectReturned = {
    "songs": [],
    "playlists": []
  }

  player.songs.forEach(song => {
    if(song.title.toLowerCase().includes(newQuery) || song.album.toLowerCase().includes(newQuery) || song.artist.toLowerCase().includes(newQuery)){
      objectReturned["songs"].push(song);
    }
  });
  // Sorting Songs by title
  objectReturned.songs.sort(function(name1, name2) {
    // Ignore uppercase and lowercase chars
    var nameA = name1.title.toUpperCase(); 
    var nameB = name2.title.toUpperCase(); 
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;   
  })

  player.playlists.forEach(playlist => {
    if(playlist.name.toLowerCase().includes(newQuery)){
      objectReturned["playlists"].push(playlist);
    }
  });

  // Sorting Playlists by names
  objectReturned.playlists.sort(function(name1, name2) {
    // Ignore uppercase and lowercase chars
    var nameA = name1.name.toUpperCase(); 
    var nameB = name2.name.toUpperCase(); 
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;      
  });

  return objectReturned;
}


function searchByDuration(duration) {
  if(player.songs.length === 0){
    throw "No songs exists";
  }
  const secondsDuration = from_Time_String_To_Seconds(duration);
  let lowestReduceNumber = Math.abs(player.songs[0].duration - secondsDuration);
  let selected_ID = 0;  
  let returnSongOrPlaylist = "";
  player.songs.forEach(song => {
    if(lowestReduceNumber > Math.abs(song.duration - secondsDuration)){
      lowestReduceNumber = Math.abs(song.duration - secondsDuration);
      selected_ID = song.id;
      returnSongOrPlaylist = "song";
    }
  });

  player.playlists.forEach(playlist => {
    if(lowestReduceNumber > Math.abs(playlistDuration(playlist.id) - secondsDuration)){
      lowestReduceNumber = Math.abs(playlistDuration(playlist.id) - secondsDuration);
      selected_ID = playlist.id;
      returnSongOrPlaylist = "playlist";
    }
  });

  if(returnSongOrPlaylist === "song"){
    return player.findSongByID(selected_ID);
  }
  else if (returnSongOrPlaylist === "playlist"){
    return player.findPlaylistByID(selected_ID);
  }
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
