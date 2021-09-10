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
    id_is_int_and_does_exists(song, "song");
    const songObj = this.findSongByID(song);
    
    console.log("Playing " + songObj.title + " from " + songObj.album + " by " + songObj.artist + " | " + calcPlayTime(songObj.duration) + ".");
    
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
  id_is_int_and_does_exists(id, "song");  
  remove_ID_from(id, "songs");
  
  // Remove from playlist
  player.playlists.forEach(playlistObj => {
    const index = playlistObj.songs.indexOf(id)
    if(index > -1){
      playlistObj.songs.splice(index, 1);
    }
  });
  
}

function addSong(title, album, artist, duration, id) {
  const convertedDuration = from_Time_String_To_Seconds(duration);  
  id = id_been_taken_or_generate(id, "song");

  player.songs.push({title, album, duration: convertedDuration, artist, id});

  return id;
}


function removePlaylist(id) {    
  id_is_int_and_does_exists(id, "playlist");
  remove_ID_from(id, "playlists");
}



function createPlaylist(name, id) {  
  id = id_been_taken_or_generate(id, "playlist");
  player.playlists.push({id, name, songs: []});
  
  return id;
}

function playPlaylist(id) {
  id_is_int_and_does_exists(id, "playlist");
  const playlistObj = player.findPlaylistByID(id);
  playlistObj.songs.forEach(song => playSong(song));
}

function editPlaylist(playlistId, songId) {
  const myPlaylist = player.findPlaylistByID(playlistId);
  const song  = player.findSongByID(songId);
  id_is_int_and_does_exists(playlistId, "playlist");
  id_is_int_and_does_exists(songId, "song");
  
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

function playlistDuration(id) {
  const myPlaylist = player.findPlaylistByID(id);
  id_is_int_and_does_exists(id, "playlist");
  
  let durationInSeconds = 0;
  myPlaylist.songs.forEach(song => {
    const songObj = player.findSongByID(song);
    durationInSeconds += songObj.duration;
  });
  return durationInSeconds;  
}

function searchByQuery(query) {
  const lowerCaseQuery  = query.toLowerCase();
  const objectReturned = {
    "songs": [],
    "playlists": []
  }

  player.songs.forEach(song => {
    if(song.title.toLowerCase().includes(lowerCaseQuery) || song.album.toLowerCase().includes(lowerCaseQuery) || song.artist.toLowerCase().includes(lowerCaseQuery)){
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
    if(playlist.name.toLowerCase().includes(lowerCaseQuery)){
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
  else if(!check_Time_String_Validtion(duration)){
    throw "Duration is not valid (MM:SS)";
  }
  const secondsDuration = from_Time_String_To_Seconds(duration);
  let lowestReduceNumber = Math.abs(player.songs[0].duration - secondsDuration);
  let selected_ID = player.songs[0].id;  
  let returnSongOrPlaylist = "song";
  player.songs.forEach(song => {
    let diffrence = Math.abs(song.duration - secondsDuration);
    if(lowestReduceNumber > diffrence){
      lowestReduceNumber = diffrence;
      selected_ID = song.id;
      returnSongOrPlaylist = "song";
    }
  });

  player.playlists.forEach(playlist => {
    let diffrence = Math.abs(playlistDuration(playlist.id) - secondsDuration);
    if(lowestReduceNumber > diffrence){
      lowestReduceNumber = diffrence;
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


//==============================================
// ============ Extra Functions ================
//==============================================

// ===> Check if String is in MM:SS format <===
function check_Time_String_Validtion(str){
  const regex = new RegExp('^[0-9]{2}:[0-9]{2}$');
  return regex.test(str);
}

// ===> removing ID from an attribute <===
function remove_ID_from(id, attribute){
  player[attribute].forEach((Obj, index) => {
    if(Obj.id === id)
      player[attribute].splice(index, 1);
  });    
}

// ===> Returns ID. Checks if ID is taken - if not, generate ID and returns it <===
function id_been_taken_or_generate(id, songOrPlaylist){
  let returnedObj;
  if(songOrPlaylist === "song"){
    returnedObj = player.findSongByID(id);
  }
  else if (songOrPlaylist === "playlist"){
    returnedObj = player.findPlaylistByID(id);
  }

  if(returnedObj !== undefined){
    throw "That ID has been taken";   
  };
  // If ID doesnt omitted - generate ID
  if(id === undefined){
    return generate_ID(songOrPlaylist);
  }
  else{
    if(isNaN(id)){
      throw "ID must be a number";
    }
  }
  return id;
}

// ===> Validation of id in a playlist or song <===
function id_is_int_and_does_exists(id, songOrPlaylist){
  let Obj;
  if(songOrPlaylist === "song")
    Obj = player.findSongByID(id);
  else if(songOrPlaylist === "playlist")
    Obj = player.findPlaylistByID(id);
  
  if(isNaN(id)){
    throw "ID must be a number";
  }  
  else if(Obj === undefined){
    throw "non existent ID";
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
    if(songObj === undefined){      
      return i;
    } 
    i++;
  }

  // To Playlist
  while(songOrPlaylist === "playlist"){
    const playlistObj = player.findPlaylistByID(i);    
    if(playlistObj === undefined){      
      return i;
    } 
    i++;
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
