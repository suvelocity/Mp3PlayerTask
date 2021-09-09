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
  let mm = (Math.floor(secounds / 600).toString() + (Math.floor(secounds / 60)-Math.floor(secounds / 600)) + ":");
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
  return parseInt(duration[0])*600 + parseInt(duration[1])*60 + parseInt(duration[3])*10 + parseInt(duration[4]);
}
// throw error if id not exist in songs
function throwNotExistSong(id){
  if(player.songs.findIndex( i => (i.id === id))=== -1){
    throw "ID does not exist";
  }
}
// throw error if id not exist in playlists
function throwNotExistPlaylist(id){
  if(player.playlists.findIndex( i => (i.id === id))=== -1){
    throw "ID does not exist";
  }
}
// throw error if id exist in songs
function throwExistSong(id){
  if(player.songs.findIndex( i => (i.id === id))>= 0){
    throw "ID alredy exist";
  }
}
// throw error if id exist in playlists
function throwExistPlaylist(id){
  if(player.playlists.findIndex( i => (i.id === id))>= 0){
    throw "ID alredy exist";
  }
}

function playSong(id) {
  throwNotExistSong(id);
  for (let song of player.songs){
    if(song.id === id){
      console.log(player.playSong(song));
    }
  }
}

function removeSong(id) {
  throwNotExistSong(id);
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
  };
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
  };
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
  throwNotExistPlaylist(playlistId);
  throwNotExistSong(songId);
  for(let i = 0; i< player.playlists.length; i++){
    if(player.playlists[i].songs.indexOf(songId) === -1 ){
      player.playlists[i].songs.push(songId);
    }else if (player.playlists[i].songs.indexOf(songId) >= 0 ){
      player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(songId),1);
    }
    if(player.playlists[i].songs.length === 0 ){
      player.playlists.splice(i,1);
    }
  }
}

function playlistDuration(id) {
  throwNotExistPlaylist(id);
  let durationSum = 0;
  for(let i = 0; i< player.playlists.length; i++){
    if(player.playlists[i].id === id){
      for(let songId of player.playlists[i].songs){
        for(let songsIndex in player.songs){
          if(player.songs[songsIndex].id === songId){
          durationSum += player.songs[songsIndex].duration;
          }
        }
      }
    }
  }
 return  durationSum;
}

function searchByQuery(query) {
  let resultSearchByQuery = {"playlists": [], "songs": []};
  for(let i = 0; i< player.songs.length; i++){
    if (player.songs[i].title.toLowerCase().includes(query.toLowerCase())){
      resultSearchByQuery.songs.push(player.songs[i]);
    }else if(player.songs[i].album.toLowerCase().includes(query.toLowerCase())){
      resultSearchByQuery.songs.push(player.songs[i]);
    }else if(player.songs[i].artist.toLowerCase().includes(query.toLowerCase())){
      resultSearchByQuery.songs.push(player.songs[i]);
    }
  }
  for(let i = 0; i< player.playlists.length; i++){
      if(player.playlists[i].name.toLowerCase().includes(query.toLowerCase())){
      resultSearchByQuery.playlists.push(player.playlists[i]);
    }
  }
  // Sort the songs by title
  resultSearchByQuery.songs.sort(function(a, b) {
    let nameA = a.title.toUpperCase(); 
    let nameB = b.title.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  // Sort the playlists by name
  resultSearchByQuery.playlists.sort(function(a, b) {
    let nameA = a.name.toUpperCase(); 
    let nameB = b.name.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return resultSearchByQuery;
}

function searchByDuration(duration) {
  let difference = Infinity;
  let closestDurationSong = null;
  let seconds = mmssToSeconds (duration);
  for(let i = 0 ; i < player.songs.length ; i++ ){ 
    if (Math.max(seconds,player.songs[i].duration)-Math.min(seconds,player.songs[i].duration) < difference){
    difference = Math.max(seconds,player.songs[i].duration)-Math.min(seconds,player.songs[i].duration);
    closestDurationSong = player.songs[i];
    }
  }
  let durationSum = 0;
  for(let i = 0; i< player.playlists.length; i++){
    for(let songId of player.playlists[i].songs){
      for(let songsIndex in player.songs){
        if(player.songs[songsIndex].id === songId){
          durationSum += player.songs[songsIndex].duration;
        }
        if (Math.max(seconds,durationSum)-Math.min(seconds,durationSum) < difference){
          difference = Math.max(seconds,durationSum)-Math.min(seconds,durationSum);
          closestDurationSong = player.playlists[i];
        }
      }
    }
  }
   return closestDurationSong;
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
