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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${song.duration}.`)
  },
}

//a function that returns an array with all the songs id
function listOfId(){
  const idList = [];
  for(let i = 0; i < player.songs.length; i++){
    idList.push(player.songs[i].id); 
  }
  idList.sort((a, b) => a - b);
  return idList;
}

//this function do the same as listOfId but for playlists
function listOfPlayListId(){
  const idList = [];
  for(let i = 0; i < player.playlists.length; i++){
    idList.push(player.playlists[i].id); 
  }
  idList.sort((a, b) => a - b);
  return idList;
}

//the function below returns a given song duration in the mm:ss template
function songDuration(id){
  let totalTime = findSongById(id).duration;
  let minutes = 0;
  let seconds = 0;

  while(totalTime >= 60){
    minutes++;
    totalTime -= 60;
  }
  seconds = totalTime;
  
  return "0" + minutes + ":" + seconds
}

// convert the duration from 'mm:ss' template to seconds
function convertToSeconds(duration){
  let seconds;
  let $duration = duration.split("");
  $duration.shift();
  seconds = ($duration[0] * 60) + ($duration[2] * 10)+ $duration[3] * 1;
  return seconds;
}

//the function below return a song object by id
function findSongById(id){
  return player.songs.find(song => {return song.id === id});
}

// the function below return a playlist object by id
function findPlaylistById(id){
  return player.playlists.find(PL => PL.id === id);
}

function playSong(id) {
  const song = findSongById(id);
  song.duration = songDuration(id);
  player.playSong(song);
}

function removeSong(id) {
  let playList, indexInPlayList, indexOfPlayList;
  const indexOfSong = player.songs.findIndex(song => {return song.id === id});
  
  if(indexOfSong === -1){
    throw 'id not found';
  }

  player.songs.splice(indexOfSong, 1);
  while(player.playlists.find(PL => {return PL.songs.find(x => x === id)})){
    playList = player.playlists.find(PL => {return PL.songs.find(x => x === id)}); 
    indexOfPlayList = player.playlists.findIndex(PL => {return PL.songs.find(x => x === id)});
    indexInPlayList = playList.songs.findIndex(x => x === id);
    playList.songs.splice(indexInPlayList, 1);
    player.playlists[indexOfPlayList].songs.splice(indexInPlayList, 0);
    
  }
}

function addSong(title, album, artist, duration, id) {
  let idOfNewSong = id;
  let list = listOfId();
  if(!id){
    idOfNewSong = list[list.length - 1] + 1;
  }
  else if(findSongById(id)){
    throw 'the ID is taken';
  }
  player.songs.push({"id": idOfNewSong, "title": title, "album": album, "artist": artist, "duration": convertToSeconds(duration)});
  return idOfNewSong;
}

function removePlaylist(id) {
  const indexOfPlayList = player.playlists.findIndex(PL => {return PL.id === id});
  if(indexOfPlayList === -1){
    throw 'id not found';
  }
  player.playlists.splice(indexOfPlayList, 1);
}

function createPlaylist(name, id) {
  let idOfNewPL = id;
  const list = listOfPlayListId();
  if(!id){
    idOfNewPL = list[list.length - 1] + 1;
  }
  else if(player.playlists.find(PL => PL.id === id)){
    throw 'id is taken';
  }
  player.playlists.push({"id": idOfNewPL, "name": name, "songs": []});
  return idOfNewPL;
}

function playPlaylist(id) {
  const playList = player.playlists.findIndex(PL => PL.id === id);
  for(let song of player.playlists[playList].songs){
    playSong(song);
  }
}

function editPlaylist(playlistId, songId) {
  const playlistIndex = player.playlists.findIndex(PL => PL.id === playlistId);
  let songIndex = player.playlists[playlistIndex].songs.findIndex(song => song === songId);
  if(!findPlaylistById(playlistId) || !findSongById(songId)){
    throw 'id not found';
  }
  if(songIndex !== -1){
    player.playlists[playlistIndex].songs.splice(songIndex, 1);
  }
  else if(songIndex === -1){
    player.playlists[playlistIndex].songs.push(songId);
  }
  if(player.playlists[playlistIndex].songs.length === 0){
    removePlaylist(playlistId);
  }
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
