const player = {
  MAX_SONGS: 100000,
  MAX_PLAYLIST: 1000,
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

  playSong(id) {
    const songObj = this.findSongByID(id);
    console.log("Playing " + songObj.title + " from " + songObj.album + " by " + songObj.artist + " | " + calcPlayTime(songObj.duration) + ".");    
  },

  // ===> Returns the song by the ID given <===
  findSongByID(id){    
    return player.songs.find(songObj => songObj.id === id);        
  },

  // ===> Returns the playlist by the ID given <===
  findPlaylistByID(id){    
    return player.playlists.find(playlistObj => playlistObj.id === id);       
  }
}

//===============================================
// ============ Player Functions ================
//===============================================
//
//

function playSong(id) {
  player.playSong(id);
}

function removeSong(id) {
  let existFlag = false;

  validateID(id);
  player.songs.forEach((Obj, index) => {
    if(Obj.id === id){
      player.songs.splice(index, 1);
      // Song Existed - remove from all playlists
      player.playlists.forEach(playlistObj => {
        const index = playlistObj.songs.indexOf(id);
        if(index > -1){
          playlistObj.songs.splice(index, 1);
        }
      });
      existFlag = true;      
    }  
  });      
  
  if (!existFlag)
    throw  "remove song: non existent Song ID: " + id; 
}

function addSong(title, album, artist, duration, id) {  
  
  validateTimeString(duration);  
  validateString(title,"title");
  validateString(album,"album");
  validateString(artist,"artist");
  
  const durationSec = convertTimeToSec(duration);  
  
  // If ID omitted - generate ID
  if(id === undefined){
    id = generateSongID();
  }
  else{
    validateID(id);
    if (player.findSongByID(id) !== undefined){
      throw "song already exist: " + id;  
    }
  }
  
  player.songs.push({title, album, duration: durationSec, artist, id});
  
  return id;
}

function removePlaylist(id) {    
  validatePlaylist(id);
  player.playlists.forEach((Obj, index) => {
    if(Obj.id === id){
      player.playlists.splice(index, 1);      
    }  
  });      
}

function createPlaylist(name, id) { 
  validateString(name, "playlist name");

  // If ID omitted - generate ID
  if(id === undefined){
    id = generatePlaylistID();
  }
  else{
    validateID(id);
    if (player.findPlaylistByID(id) !== undefined)
      throw "song already exist: " + id;  
  }
  
  player.playlists.push({id, name, songs: []});
  
  return id;
}

function playPlaylist(id) {
  validatePlaylist(id);
  const playlistObj = player.findPlaylistByID(id);
  playlistObj.songs.forEach(song => playSong(song));
}

function editPlaylist(playlistId, songId) {
  validatePlaylist(playlistId);
  validateSong(songId);
  const myPlaylist = player.findPlaylistByID(playlistId);    
  let songIndex = myPlaylist.songs.indexOf(songId);

  if(songIndex > -1){
    myPlaylist.songs.splice(songIndex, 1);      
    if(myPlaylist.songs.length === 0)
      removePlaylist(playlistId);
  }  
  else
    myPlaylist.songs.push(songId);       
}

function playlistDuration(id) {  
  validatePlaylist(id);
  const myPlaylist = player.findPlaylistByID(id);
  let durationInSeconds = 0;
  myPlaylist.songs.forEach(song => {   
    durationInSeconds += player.findSongByID(song).duration;
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
    if(song.title.toLowerCase().includes(lowerCaseQuery) || 
       song.album.toLowerCase().includes(lowerCaseQuery) || 
       song.artist.toLowerCase().includes(lowerCaseQuery)){
      objectReturned.songs.push(song);
    }
  });

  // Sorting Songs by title
  objectReturned.songs.sort(function(name1, name2) {    
    var nameA = name1.title.toUpperCase(); 
    var nameB = name2.title.toUpperCase(); 
    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;   
  })

  player.playlists.forEach(playlist => {
    if(playlist.name.toLowerCase().includes(lowerCaseQuery)){
      objectReturned.playlists.push(playlist);
    }
  });

  // Sorting Playlists by names
  objectReturned.playlists.sort(function(name1, name2) {    
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
  validateTimeString(duration);    
  const secondsDuration = convertTimeToSec(duration);

  let lowestDiffrenceSec = Math.abs(player.songs[0].duration - secondsDuration);
  let lowestDiffrenceID = player.songs[0].id;  
  let lowestDiffrenceType = "song";
    
  player.songs.forEach(song => {
    let diffrence = Math.abs(song.duration - secondsDuration);
    if(lowestDiffrenceSec > diffrence){
      lowestDiffrenceSec = diffrence;
      lowestDiffrenceID = song.id;      
    }
  });

  player.playlists.forEach(playlist => {
    let diffrence = Math.abs(playlistDuration(playlist.id) - secondsDuration);
    if(lowestDiffrenceSec > diffrence){
      lowestDiffrenceSec = diffrence;
      lowestDiffrenceID = playlist.id;
      lowestDiffrenceType = "playlist";
    }
  });

  if(lowestDiffrenceType === "song"){
    return player.findSongByID(lowestDiffrenceID);
  }
  else if (lowestDiffrenceType === "playlist"){
    return player.findPlaylistByID(lowestDiffrenceID);
  }
}

//==============================================
// ============ Internal Functions ================
//==============================================

// ===> Check if String is in MM:SS format <===
function validateTimeString(str){
  const regex = new RegExp('^[0-9]{2}:[0-9]{2}$');
  if(!regex.test(str))
    throw "Duration is not valid format (MM:SS) :" + str;  
}

function validateString(str, stringLabel){
  
  if(str === "" || str === undefined)
    throw stringLabel + " is not valid :" + str;  
}

function validateSong(id){
  let Obj;
  
  validateID(id);
  Obj = player.findSongByID(id);
  if(Obj === undefined)
    throw "non existent Song ID: " + id;
}

function validatePlaylist(id){
  let Obj;
   
  validateID(id);
  Obj = player.findPlaylistByID(id);
  if(Obj === undefined)
    throw "non existent Song ID: " + id;  
}

// ===> Validation wheter id is a number <===
function validateID(id){
  if(isNaN(id))
    throw "ID must be a number: " + id;
  if (id === undefined)
    throw "ID is undefined";
} 

// ===> Convert MM:SS to Seconds <===
function convertTimeToSec(duration){
  const newDuration = duration.split(":")
  return parseInt(newDuration[0]) * 60 + parseInt(newDuration[1]);
}

// ===> Reformat from seconds to MM:SS <===
function calcPlayTime(durationTime) {
  const min = Math.floor(durationTime / 60);
  const sec = durationTime - min * 60;
  // Should add 0 before the number?   
  const numberAsString1 = (min < 10) ? "0" : "";
  const numberAsString2 = (sec < 10) ? "0" : "";
  return numberAsString1 + min + ":" + numberAsString2 + sec;
}

function generateSongID(){
  for (i=1; i < player.MAX_SONGS; i++) {
    const songObj = player.findSongByID(i);    
    if(songObj === undefined)      
      return i;
  }
  throw "Sorry, Songs reached max capacity";
}

function generatePlaylistID(){
  for (i=1; i < player.MAX_PLAYLIST; i++) {
    const playlistObj = player.findPlaylistByID(i);    
    if(playlistObj === undefined)
      return i;
  }
  throw "Sorry, Playlists reached max capacity";
}

//==============================================
// ============ Test Export     ================
//==============================================

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
