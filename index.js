const { stringLiteral, assertEnumDeclaration } = require("@babel/types");

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
    { id: 1, name: 'Metal', songs: [1,7,4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log("Playing "+song.title +" from " + song.album + " by " +song.artist + " | " +durationConverter(song.duration) + ".");
  }
}

function playSong(id) {
  let indexId=player.songs.findIndex(i=>i.id===id);
  // if the index isnt exist we throw , else we call the player.playsong function
  if(indexId===-1){
    throw("non-existent ID");
  }else{
    player.playSong(player.songs[indexId])
  }
  
}

function durationConverter(dur){
  // a function to evaluate the song duration in mm:ss format.
  let mins=0;
  let secs=0;
  
  mins=Math.floor(dur/60);
  secs=dur%60;
  let mins_str = mins<10 ? "0" + mins : mins;
  let secs_str = secs<10 ? "0" + secs : secs;
  let mmSs = mins_str + ":" + secs_str;

  return mmSs
 
}



function removeSong(id) {
  // removes the chosen song from the songs list
  let found=false;
  for(let i=0 ; i<player.songs.length ; i++){
    if(player.songs[i].id===id){
      found=true;
      player.songs.splice(i,1);
    }
  }
  if(!found){
    throw("non-existent ID");
  }
  // removes the song from all playlist it appears in
  for(let playlist of player.playlists){
    for(let i=0 ; i<playlist.songs.length ; i++){
      if(playlist.songs[i]===id){
        playlist.songs.splice(i,1);
      }
    }

  }
}



function addSong(title, album, artist, duration, id=-1) {
  // add a song to the player songs list
  // the first part auto generates func for original and reasonable id for the new song.
  let idSet= new Set();
  for(let song of player.songs){
    idSet.add(song.id);
  }
  if(id===-1){
    let i=1;
    while(true){
      if(!idSet.has(i)){
        break;
      }
      i++
    }
    id=i;
  }
    
    
  if(idSet.has(id)){
    throw("Taken ID");
  }

  let newSong={
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: durationConverterOtherSide(duration)
    
  };
  player.songs.push(newSong);
  return newSong.id;
}


function removePlaylist(id) {
  // removes chosen playlist from the player playlists list.
  let found=false
  for(let i = 0 ; i<player.playlists.length ; i++){
    if (player.playlists[i].id===id){
      player.playlists.splice(i,1);
      found=true;
    }
  }
  if(!found){
    throw("non-existent ID");
  }

}


function createPlaylist(name, id=-1) {
  // creates a new playlist and insert it to the player playlists list.
  let idSet= new Set();
  for(let playlist of player.playlists){
    idSet.add(playlist.id);
  }
  if(id===-1){
    let i=1;
    while(true){
      if(!idSet.has(i)){
        break;
      }
      i++
    }
    id=i;
  }
    
    
  if(idSet.has(id)){
    throw("Taken ID");
  }

  let newPlaylist={
    id:id,
    name:name,
    songs:[]
    
  };
  player.playlists.push(newPlaylist);
  
  return newPlaylist.id;
  
}



function playPlaylist(id) {
  // shows (plays) all the songs in the chosen playlist .
  let songsId=[];
  let songsIdSet = new Set();
  let found=false;
  // loop for define a set with songs id's we need to console log
  for(let playlist of player.playlists){
    
    if(playlist.id===id){
      songsId=playlist.songs;
      found=true;
      songsIdSet=new Set(songsId);
    }
    
  }
  if(!found){
    throw("non-existent ID");
  }
  for(let song of player.songs){
    if(songsIdSet.has(song.id)){
      console.log(song);
    }
  }
}


function editPlaylist(playlistId, songId) {
 
//  defining two variables , one for the songs id and one for the playlist id
 let songsArrId=player.songs.map(x => x.id);
 let playlistArrId=player.playlists.map(x => x.id);
// throw area for non existing id's
        if(!(playlistArrId.includes(playlistId))){
          throw("Non-existent playlist ID")
        }
        if(!(songsArrId.includes(songId))){
          throw("Non-existent song ID")
        }
  
// Find index of playlist whose id is equal to playlistId
  let currPlay_ind=player.playlists.findIndex(element => element.id===playlistId)
  let currPlay=player.playlists[currPlay_ind]

// Find the index of the song whose id is equal to songId
  let songIndex=currPlay.songs.findIndex(element => element===songId)
  if (songIndex === -1){// If song not found, add it to the playlist
    currPlay.songs.push(songId);
  }
  else{ // If song found, delete it from playlist. If afterwards the playlist is empty, delete it.
    currPlay.songs.splice(songIndex,1);
    if(currPlay.songs.length===0){
        player.playlists.splice(currPlay_ind,1);
    }
  }

}
 
function playlistDuration(id) {
  // function that calculates the total duration of the playlist
    let songsId=[];
    let plSongsId=new Set();
    totalDuration=0;
    // loop for define a set with the songs id
  for(let i = 0 ; i<player.playlists.length ; i++){
    if(player.playlists[i].id===id){
      songsId=player.playlists[i].songs;
      plSongsId=new Set(songsId)
    }
  }
  // loop for evaluate the total duration of the playlist using "totalDuration" as a paremeter. 
  for(let song of player.songs){
    if(plSongsId.has(song.id)){
      totalDuration+=song.duration;
    }
  }
  return totalDuration;
}


function searchByQuery(query) {
  query=query.toLowerCase()
  let songsFound=[];
  let playlistsFound=[];
  
//making songs array
  for(let song of player.songs){
    if(song.title.toLowerCase().includes(query) || song.album.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query) ){
      songsFound.push(song);
    }
  }
  // making playlists array
  for(let playlist of player.playlists){
    if(playlist.name.toLowerCase().includes(query)){
      playlistsFound.push(playlist);
    }
  }
  // sort the array by object string key(alphabetical order)
  songsFound.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
  playlistsFound.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  
//  define the final result object
  let queryResult={songs: songsFound,playlists:playlistsFound};
  return queryResult;
}


function searchByDuration(duration) {
  let durationNum=durationConverterOtherSide(duration);
  let minSongs = Math.abs((player.songs[0].duration)-durationNum);
  let minS_index=0;
  let minPlaylists =Math.abs(playlistDuration(player.playlists[0].id)-durationNum);
  let minP_index=0;
  for(let i = 0; i<player.songs.length ; i++){
    // find the song with the nearest duration
    if(Math.abs((player.songs[i].duration)-durationNum)<minSongs){
      minSongs=Math.abs((player.songs[i].duration)-durationNum);
      minS_index=i;
    }
  }
  for(let j = 0; j<player.playlists.length ; j++){
    // finds the playlist with the nearest duration
    if(Math.abs((playlistDuration(player.playlists[j].id))-durationNum)<minPlaylists){
      minPlaylists=Math.abs(playlistDuration(player.playlists[j].id)-durationNum);
      minP_index=j;
    }
  }
  if(minPlaylists>minSongs){
    // calculates what closer , the playlists nearest duration or the songs nearest duration
    return player.songs[minS_index];
  }else{
    return player.playlists[minP_index];
  }
}

function durationConverterOtherSide (mmSs){
  // a function to evaluate the song duration from mm:ss format to a number.
let min= mmSs.slice(0,2);
let sec= mmSs.slice(3,5);
let minNum = min*60;
let secNum = sec*1;
let durationNum =minNum+secNum;
return (durationNum);
}
// 



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



