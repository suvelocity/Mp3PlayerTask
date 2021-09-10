const { isIdentifier, LOOP_TYPES } = require("@babel/types");

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
    console.log( "Playing "+ song["title"]+ " from "+ song.album+ " by "+ song.artist+ " | "+ ('0' + Math.floor(song.duration / 60)).slice(-2)+":"+ song.duration%60 +".")
  },
}

function playSong(id) {
  player.playSong(player.songs.find( song => song.id === id));
}

function removeSong(id) {
  if (!idIsTakenQUSTION(id)){
    throw("non-existent ID");
  }
  player.songs.splice((player.songs.find( song => song.id === id)),1);
  for (let i =0; i< player.playlists.length; i++){
    for (let j = 0; j< player.playlists[i].songs.length;j++){
      if (player.playlists[i].songs[j] === id){
        player.playlists[i].songs.splice(j,1);
      }
    }
  }
}

function addSong(title, album, artist, duration, id = genarateIDSongs()) {
  if (idIsTakenQUSTION(id)){
    throw(id);
  }
  player.songs.push({
    ["title"] : title,
    ["album"] : album,
    ["artist"] : artist,
    ["duration"] : formatMinutsToSeconds(duration),
    ["id"] : id
  })
  return id;
}

function removePlaylist(id) {
  player.playlists.splice((getPlaylistById(id)),1);
}

function createPlaylist(name, id = genarateIDSongsPlaylist()) {
  if (idIsTakenPlaylistQUSTION(id)){
    throw(id);
  }
  player.playlists.push({
    ["name"] : name,
    ["id"] : id,
    ["songs"] : []
  })
  return id
}

function playPlaylist(id) {
  for (let i = 0; i < getPlaylistById(id).songs.length; i++){
    playSong(getPlaylistById(id).songs[i]);
  }
}


function editPlaylist(playlistId, songId) {
  getSongById(songId);
  if (getPlaylistById(playlistId).songs.includes(songId)){
    if (getPlaylistById(playlistId).songs.length > 1){
      removeSongFromPlaylist(playlistId,songId);
    }
    else{
      removePlaylist(playlistId);
    }
  }
  else {
    getPlaylistById(playlistId).songs.push(songId);
  }

}
function playlistDuration(id) {
  let sum =0;
  for (let i =0; i<getPlaylistById(id).songs.length;i++){
    sum +=getSongById(getPlaylistById(id).songs[i]).duration;
  }
  return sum;
}

function searchByQuery(query) {
  let songTitles = [];
  let playlistNames= [];
  let objectsContainsTheQuery= {"songs": [], "playlists": []};
  for (let index = 0; index < player.songs.length; index++) {
    if(player.songs[index].title.includes(query) || player.songs[index].album.includes(query) || player.songs[index].artist.includes(query)){
        songTitles.push(player.songs[index].title);
    }
  }
  for (let i= 0; i< player.playlists.length;i++){
    if (player.playlists[i].name.includes(query)) {
        playlistNames.push(player.playlists[i].name);
    }
  }
  songTitles.sort();
  playlistNames.sort();
  for (let i = 0; i < songTitles.length; i++) {
    objectsContainsTheQuery.songs.push(getSongByTitle(songTitles[i]));  
  }
  for (let i = 0; i < playlistNames.length; i++) {
    objectsContainsTheQuery.playlists.push(getPlaylistByName(playlistNames[i]));  
  }
  return objectsContainsTheQuery;
}
function searchByDuration(duration) {
  let closestDurationObject = player.songs[0];
  let durationInSeconds = formatMinutsToSeconds(duration);
  let distance = Math.abs(player.songs[0].duration - durationInSeconds);
  for (let i = 0; i< player.songs.length;i++){
    if (Math.abs(player.songs[i].duration - durationInSeconds) < distance) {
      distance = Math.abs(player.songs[i].duration - durationInSeconds);
      closestDurationObject = player.songs[i];
    }
  }
  for (let index = 0; index < player.playlists.length; index++) {
    if (Math.abs(playlistDuration(player.playlists[index].id) - durationInSeconds) < distance) {
      distance = Math.abs(playlistDuration(player.playlists[index].id) - durationInSeconds);
      closestDurationObject = player.playlists[index];
    }
  }
  return closestDurationObject;
}

// help functions:

function genarateIDSongs (){
  for (let i = 1; i < player.songs.length+1;i++){
    let flag = true;
    for (let j = 0; j < player.songs.length;j++){
      if(player.songs[j].id === i){
        flag =false;
        break;
      }
    }
    if (flag){return i}
  }
}
function genarateIDSongsPlaylist (){
  for (let i = 1; i < player.playlists.length+1;i++){
    let flag = true;
    for (let j = 0; j < player.playlists.length;j++){
      if(player.playlists[j].id === i){
        flag =false;
        break;
      }
    }
    if (flag){return i}
  }
}
function formatMinutsToSeconds (duration){
  let seconds = parseInt(duration.slice(0,2))*60 + parseInt(duration.slice(3,5));
  return seconds;
}
function idIsTakenQUSTION(id){
  for (let i = 0; i < player.songs.length;i++){
    if(player.songs[i].id === id){
      return true;
    }
  }
  return false;
}
function idIsTakenPlaylistQUSTION(id){
  for (let j = 0; j < player.playlists.length;j++){
    if(player.playlists[j].id === id){
      return true;
    }
  }
  return false;
}
function getPlaylistById(playlistId){
  for (let j = 0; j < player.playlists.length;j++){
    if(player.playlists[j].id === playlistId){
      return player.playlists[j];
    }
  }
  throw("non-existent playlist ID");
}
function getSongById(songId){
  for (let j = 0; j < player.songs.length;j++){
    if(player.songs[j].id === songId){
      return player.songs[j];
    }    
  }
 throw("non-existent song ID");
}
function removeSongFromPlaylist(playlistId, songId){
  for (let i = 0 ; i< getPlaylistById(playlistId).songs.length;i++) {
    if (getPlaylistById(playlistId).songs[i] === songId) {
      getPlaylistById(playlistId).songs.splice(i,1);
    }
  }
}
function getSongByTitle(title){
  for (let j = 0; j < player.songs.length;j++){
    if(player.songs[j].title === title){
      return player.songs[j];
    }    
  }
}
function getPlaylistByName(name){
  for (let j = 0; j < player.playlists.length;j++){
    if(player.playlists[j].name === name){
      return player.playlists[j];
    }    
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
