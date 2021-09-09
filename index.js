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
    return (`Playing ${song.title} from ${song.album} by ${song.artist} | ${secondsToMinutes(song.duration)}.`)
  },
}

function secondsToMinutes(duration){
  let secounds = duration;
  // Calculating the minutes
  let mm = ( "0" + Math.floor(secounds / 60) + ":");
  // Calculate the remaining seconds
  let ss; 
  if (secounds % 60 < 10) { 
    ss = "0"+ secounds % 60;
  }else if (secounds % 60  ){ 
    ss =  secounds % 60;
  }else {
    ss = '00';
  }
  return mm +ss;
}

function mmssToSeconds (duration){
  return parseInt(duration[0])*60 + parseInt(duration[1])*60 + parseInt(duration[3]) + parseInt(duration[4]);
}

function throwNotExistSong(id){
  if(player.songs.findIndex( i => (i.id === id))=== -1){
    throw "ID does not exist";
  }
}

function throwNotExistPlaylist(id){
  if(player.playlists.findIndex( i => (i.id === id))=== -1){
    throw "ID does not exist";
  }
}

function throwExistSong(id){
  if(player.songs.findIndex( i => (i.id === id))>= 0){
    throw "ID does not exist";
  }
}

function throwExistPlaylist(id){
  if(player.playlists.findIndex( i => (i.id === id))>= 0){
    throw "ID does not exist";
  }
}

function playSong(id) {
  throwNotExistSong(id)
  for (let song of player.songs){
    if(song.id === id){
      console.log(player.playSong(song));
    }
  }
}

function removeSong(id) {
  throwNotExistSong(id)
  for (let song of player.songs){
    if(song.id === id){
      player.songs.splice(song,1);
    }
  }
  for (let i = 0 ; i < player.playlists.length; i++){
    if( player.playlists[i].songs.indexOf(id) >=0){
      player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id),1);
    }
  }
}


function addSong(title, album, artist, duration, id) {
  if(!id){
    id = Math.floor(Math.random()*100);
  }
  throwExistSong(id);
  let newSong = {
      id: id,
      title: title,
      album: album,
      artist: artist,
      duration: mmssToSeconds(duration)
  }
  player.songs.push(newSong);
  return id;
}

function removePlaylist(id) {
  throwNotExistPlaylist(id);
  for(let i in player.playlists){
    if( player.playlists[i].id === id){
       player.playlists.splice(i, 1);
    }
  }
}

function createPlaylist(name, id) {
  if(!id){
    id = Math.floor(Math.random()*100);
  }
  throwExistPlaylist(id);
  let newPlaylist = {
      id: id,
      name: name,
      songs: []
  }
  player.playlists.push(newPlaylist);
  return id;
}

function playPlaylist(id) {
  throwNotExistPlaylist(id);
  for(let i = 0; i< player.playlists.length; i++){
    if( player.playlists[i].id === id){
      for(let song of player.playlists[i].songs){
        playSong(song);
      }
    }
  }
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
