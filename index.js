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
  
    console.log(/* your code here */)
  },
}

function playSong(id) {
  let songInfo = [];
  let x;
  let k = 0;
  for (x in player.songs){
    if (player.songs[x].id=== id){
      songInfo.push(player.songs[x].title);
      songInfo.push(player.songs[x].album);
      songInfo.push(player.songs[x].artist);
      songInfo.push(player.songs[x].duration);
      k = 1;
      console.log("Playing " + songInfo[0] + " from " + songInfo[1] +  " by " + songInfo[2] + " | " + durationMmss(songInfo[3]) + "." )
      return ;
    } 
  }
     throw 'Please enter valid id'; 
     
}
 

  function durationMmss(duration) {
   let mm = Math.floor(duration/60);
   let ss = duration%60;
   if (mm<10){
     mm = "0" + mm;
   }
   if (ss<10){
    ss = "0" + ss;
  }
  return mm + ":" + ss;
 
}

function durationtoSeconds(duration){
const mm = duration[0]+duration[1];
const ss = duration[3]+duration[4];
return duration = +mm*60 + +ss;
}


function removeSong(id) {
  let deletedSong = [];
  let deletedFromPlaylist = [];
  let x;
  let k = 0;
  for (x in player.songs){
      if (player.songs[x].id === id){
        k = 1;
        deletedSong = player.songs.splice([x],1); 
        break;
    }
  }   if ( k === 0 ) {throw 'Please enter valid id'};
      k = 0 
      for (x in player.playlists){
        if (player.playlists[x].songs.indexOf(id)>=0 ) {
          k = 1
          deletedFromPlaylist = player.playlists[x].songs.splice(player.playlists[x].songs.indexOf(id),1);
          break;
      }
   }   if ( k === 0 ) {throw 'Please enter valid id'};
} 


function addSong(title, album, artist, duration, id) {
    let k = 0
  for ( let i = 0 ; i < player.songs.length; i++ ){
      if ( player.songs[i].id === id) { 
        k = 1
        }
      }
      if ( k === 0){
      let newId = generateIdForSongs(id);
    player.songs.push(
      {
        "id" : newId,
        "title" : title,
        "album" : album,
        "artist" :  artist,
        "duration" : durationtoSeconds(duration),
      }
    );
     
      return (newId);
   } else throw 'Please choose a new id' 
}
 addSong ("this","one" , "i add","04:56",9);

function generateIdForSongs(id) {
  if (id === undefined){
    let maxId = 0;
  for ( let i = 0 ; i < player.songs.length; i++ ) {
    if ( maxId < player.songs[i].id ){
      maxId = player.songs[i].id;     
    }
  } return (maxId + 1);
  } else {
   return (id);
  }
}

function removePlaylist(id) {
  let spliced = [];
  for (let i = 0 ; i < player.playlists.length ; i++){
    if (player.playlists[i].id=== id){
      spliced = player.playlists.splice([i],1);
      return
    } else {
      throw 'Please enter valid id';
    }
     
  } 
}

function createPlaylist(name, id) {
  let k = 0;
  for ( let i = 0 ; i < player.playlists.length; i++ ){
    if ( player.playlists[i].id === id) { 
      k = 1
      }
    }
    if ( k === 0){
    let newPlaylistId = generateIdForPlaylist(id);
  player.playlists.push(
    {
       "id": newPlaylistId, "name": name, "songs": [] 
    }
  );
      return (newPlaylistId);
 } else throw 'Please choose a new id' 
   
}
createPlaylist("holand", )

function generateIdForPlaylist(id) {
  if (id === undefined){
    let maxId = 0;
  for ( let i = 0 ; i < player.playlists.length; i++ ) {
    if ( maxId < player.playlists[i].id ){
      maxId = player.playlists[i].id;     
    }
  }     
  return (maxId + 1);
  } else {
   return (id);
  }
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
