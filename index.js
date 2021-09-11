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
    console.log("Playing "+player.songs[song].title+" from "+player.songs[song].album+" by "+player.songs[song].artist+" | "+songDuration(player.songs[song].duration)+".");
  },

}
function playSong(id) {
  let num=songById(id);
  if(num==-1)
    throw("ID doesn't exist");
  player.playSong(num);
}
//check if the id exist in the playlist.song and remove the id 
removeSong(4);
function removeSong(id) {
  let idR = songById(id);
  if (idR==-1)
    throw("ID doesn't exist!");
  player.songs.splice(idR,1);
  for (let i = 0; i < player.playlists.length; i++) {
    for (let j = 0; j < player.playlists[i].songs.length; j++) {
      if(player.playlists[i].songs[j]==id){
        player.playlists[i].songs.splice(j,1);
    }
  } 
} 
} // check if the id exist and add the song to player.song
function addSong(title, album, artist, duration, id) {
  let temp = duration.split(":");
  let min = temp[0]*60;
  let sec = temp[1]*1;
  let ssduration = min + sec;
  
  if (id == undefined) id = 1;
  for (let i = 0; i < player.songs.length; i++) {
    const song = player.songs[i];
    if(song.id > id)
      id = song.id +1;
  }

player.songs.forEach(song => {
  if(song.id == id)
    throw "exception";
});
player.songs.push({id:id,title:title,album:album,artist:artist,duration:ssduration});
return id;
}
//check if the id exsist and remove it from the playlists
function removePlaylist(id) {
  let found = false;
  for (let i = 0; i < player.playlists.length && !found; i++) {
    if(player.playlists[i].id==id){
        player.playlists.splice(i,1);
        found = true;
    }
  }
  if(!found){
    throw "ID does not exist";
  }
} //check if the id exsist and add new playlist to the playlists 
function createPlaylist(name, id){
  if(id==undefined) {
    id = uniqueId();
  }
  else{
    player.playlists.forEach(playlist => {
      if(playlist.id==id)
        throw "id exsist";
    });
  }
  player.playlists.push({id:id, name:name, songs:[]});
  return id;
}// get a playlist id and play the song in the playlist.
function playPlaylist(id) {
  let p;
  player.playlists.forEach(playlist => {
    if(playlist.id == id)
      p = playlist;
  });
  if(p != undefined)
  {
    p.songs.forEach(song => {
      playSong(song);
    });
  }
  else{
    throw " id does not exist";
  }
}
//found the index of the playlist and the song
function editPlaylist(playlistId, songId) {
  let songIndex;
  let playlistIndex;
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id == playlistId) {
      playlistIndex = i;
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
          if (player.playlists[i].songs[j] == songId) {
            songIndex = j;
          } 
          
      }
      
    }
    
  }
  if(songIndex != undefined){ // if the song exsist in the playlist and there is no more song remove the playlist
    if(player.playlists[playlistIndex].songs.length == 1){
      player.playlists.splice(playlistIndex,1);

    }
    else{
      player.playlists[playlistIndex].songs.splice(songIndex,1);// if the song exsist in the plqylist remove the song
    }
  }
  else{
    player.playlists[playlistIndex].songs.push(songId);// if the song dosent exsist in the playlist add the song 
  }
  songById(songId);
  
}
// function that gets id of playlist and returns the sum of duration of all the songs in the playlist
function playlistDuration(id) {
  let countDuration = 0;
  let playlistIndex;
  for (let i = 0; i< player.playlists.length; i++) {
  if(player.playlists[i].id == id)
    playlistIndex = i;
  }

  for (let i = 0; i < player.playlists[playlistIndex].songs.length; i++) {
    for (let j = 0; j < player.songs.length; j++) {
      if(player.songs[j].id == player.playlists[playlistIndex].songs[i])
        countDuration += player.songs[j].duration;
  }
}
return countDuration;
}
//function that get a query and return object with all the songs and the playlists that include the query
function searchByQuery(query){
  let obj = {
    songs:[],
    playlists:[]
  }
  query = query.toLowerCase();
  for (let i = 0; i < player.songs.length; i++) {
    const song = player.songs[i];
    if(song.title.toLowerCase().includes(query) || song.album.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query))
      obj.songs.push(song);    
  }
  for (let i = 0; i < player.playlists.length; i++) {
    const playlist = player.playlists[i];
    if(playlist.name.toLowerCase().includes(query))
    obj.playlists.push(playlist);
  }
  obj.songs.sort(function(a, b){
    let titleA = a.title.toLowerCase();
    let titleB = b.title.toLowerCase();
    if (titleA < titleB) 
    {
      return -1;
    }    
    else if (titleA > titleB)
    {
      return 1;
    }   
    return 0;
  });

  obj.playlists.sort(function(a, b){
    let titleA = a.title.toLowerCase();
    let titleB = b.title.toLowerCase();
    if (titleA < titleB) 
    {
      return -1;
    }    
    else if (titleA > titleB)
    {
      return 1;
    }   
    return 0;
  });

  return obj;

}
//function that get a duration and check what is the closest duration in the songs and playlists and return the closest one. 
function searchByDuration(duration) {
 let time = duration.split(":");
 let min = time[0]* 60;
 let sec = time[1]*1;
 let sumsec = min+sec;
 let MinDiffrent = Math.abs(player.songs[0].duration - sumsec);
 let obj = player.songs[0];
 for (let i = 0; i < player.songs.length; i++) {
    const song = player.songs[i];
    if(MinDiffrent > Math.abs(song.duration - sumsec)){
      MinDiffrent = Math.abs(song.duration - sumsec);
      obj = song;
    }
 }
 for (let i = 0; i < player.playlists.length; i++) {
   const playlist = player.playlists[i];
   if((Math.abs(playlistDuration(playlist.id) - sumsec)) < MinDiffrent){
    MinDiffrent = Math.abs(playlistDuration(playlist.id) - sumsec);
    obj = playlist;
   }
 }

 return obj; 
}
//check the id and give the max id +1
function uniqueId(){
let id =1;
player.playlists.forEach(playlist => {
  if (playlist.id>id) {
    id = playlist.id;
    
  }
  
});
return id+1;
}
// found the index in the array of the id
function songById(idT)
{
  if (idT == undefined) idT = 0;
  for (let i = 0; i < player.songs.length; i++) {
    if(player.songs[i].id==idT)
      return i;
  }
  throw ("non-existent song ID");
}
// get duration and return it in min:sec format
function songDuration(duration){
  let min=0;
  while(duration >=60)
  {
    min++;
    duration-=60;
  }
  if(duration<10)
    return "0"+min+":0"+duration;
  return "0"+min+":"+duration;
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

