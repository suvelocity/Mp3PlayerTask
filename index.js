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
  for (x in player.songs){
    if (player.songs[x].id=== id){
      songInfo.push(player.songs[x].title);
      songInfo.push(player.songs[x].album);
      songInfo.push(player.songs[x].artist);
      songInfo.push(player.songs[x].duration);
    } 
   } console.log(songInfo);
   console.log("Playing " + songInfo[0] + " from " + songInfo[1] +  " by " + songInfo[2] + " | " + durationMmss(songInfo[3]) + "." )
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
  // console.log(mm + ":" + ss) 
}



function removeSong(id) {
  let deletedSong = [];
  let deletedFromPlaylist = [];
  let x;
  for (x in player.songs){
      if (player.songs[x].id=== id){
      deletedSong = player.songs.splice([x],1); 
      }
  }    
    for (x in player.playlists){
      console.log (id)
      console.log(player.playlists[x].songs);
      if (hasProperty (player.playlists[x].songs,id)) {
      deletedFromPlaylist = player.playlists[x].songs.splice(findIndex(player.playlists[x].songs,id),1);
      console.log(deletedFromPlaylist); 
      console.log("2");
    } 
    }
  // your code here 
  } 
  removeSong(4)

function hasProperty(arr ,value) {
    for( let i=0 ; i<arr.length ; i++){
      if(arr[i] === value){
        console.log (i)
        return true;
      } 
  } return false
}  
  function findIndex(arr,value){
    for( let i=0 ; i<arr.length ; i++){
      if(arr[i] === value){
        console.log (i)
        return i;
      }
    }
  }
 

function addSong(title, album, artist, duration, id) {
  // your code here
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
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
