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
  for (let j = 0; j < player.songs.length;j++){
    if(player.songs[j].id === id){
      return true;
    }
    else{return false;}
  }
}
function idIsTakenPlaylistQUSTION(id){
  for (let j = 0; j < player.playlists.length;j++){
    if(player.playlists[j].id === id){
      return true;
    }
    else{return false;}
  }
}
function getPlaylistById(id){
  for (let j = 0; j < player.playlists.length;j++){
    if(player.playlists[j].id === id){
      return player.playlists[j];
    }
    else{throw("non-existent ID");}
  }
}
function getSongById(id){
  for (let j = 0; j < player.songs.length;j++){
    if(player.songs[j].id === id){
      return player.songs[j];
    }
    else{throw("non-existent ID");}
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
