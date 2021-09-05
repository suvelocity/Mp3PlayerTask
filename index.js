const { stringLiteral } = require("@babel/types");

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
    {
      id: 8,
      title: '',
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
    console.log(playSong(song.id));
  }
}

function playSong(id) {
  // SELF /needs to work in a collab with the func playSong(song) , up!!
  // actually prints the song(object) info into the console 
  // `Playing As a Stone from Show Us What You Got by Full Trunk | 04:19.`
    let found=false;
    let j=-1;
    for(let i=0 ;i<player.songs.length ; i++){
      if(player.songs[i].id===id){
        found=true;
        j=i;
        break
      }
    }
    if (found){
      return "Playing "+player.songs[j].title +" from " + player.songs[j].album + " by " +player.songs[j].artist + " | " +durationConverter(player.songs[j].duration) + "."; 
    }
    else{
      throw("non-existent ID");
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
  // removes the song from the songs list\
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



function addSong(title, album, artist, duration, id) {

}

function removePlaylist(id) {
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


function createPlaylist(name, id) {
  // your code here
}
// need to add tothrow option ......
function playPlaylist(id) {
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
  // your code here
}

function playlistDuration(id) {
  // 
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
console.log('hi')

player.playSong(player.songs[0])

  
