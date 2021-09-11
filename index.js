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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationConvert(song.duration)}.`)
  },
}


function durationConvert(duration)
{
  let min = Math.floor(duration / 60);
  let sec = duration % 60;
  
  if (min < 10){
    min = "0" + String(min);
  }
  if (sec < 10) {
    sec = "0" + String(sec);
  }
  return min+':'+sec
}


function playSong(id) {
  for (let song of player.songs){
    if (song.id === id)
    {
      return player.playSong(song);
    }
  }
  throw new Error("This ID are not exist");
}


function getSongByID(id){
  for (let index = 0; index < player.songs.length; index++) {
    if(player.songs[index].id === id){
      return player.songs[index];
    }
}
throw new Error("This song are not exist")
}


function removeSong(id) {
  let songIndex=player.songs.indexOf(getSongByID(id))
  player.songs.splice(songIndex,1);
  for (let i=0; i<player.playlists.length; i++){
    for (let j=0; j<player.playlists[i].songs.length; j++){
      if (player.playlists[i].songs[j] === id)
        player.playlists[i].songs.splice(j,1);
    }
  }
}


function addSong(title, album, artist, duration, id) {
  let newID=0;
  let max=1;
  if(id){
  for (let index = 0; index < player.songs.length; index++) {
    if(player.songs[index].id===id){
      throw new Error("Sorry , this ID already taken") }}}
    else {
  for (let i = 0; i < player.songs.length; i++) {
    if(player.songs[i].id>max){
      max === player.songs[i].id;}
  }
  newID=max+1;
} 
  duration = duration.split(":");
  duration = parseInt(duration[0] *60) + parseInt(duration[1]);
  let newSong= {
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: duration };
    player.songs.push(newSong);
    return newID;
}


function getPlaylistByID(id){
  for (let index = 0; index < player.playlists.length; index++) {
    if(player.playlists[index].id === id){
      return player.playlists[index];
    }
}
throw new Error("This playlist are not exist")
}


function removePlaylist(id) {
  let playlistIndex=getPlaylistByID(id);
  player.playlists.splice(playlistIndex,1);
}


function createPlaylist(name, id) {
  let newP_ID=0
  let maxP_ID=1
  if(id){
  for (let index = 0; index < player.playlists.length; index++) {
    if(player.playlists[index].id===id){
      throw new Error("Sorry , this ID already taken")
    }
 }
 }
else {
  for (let i = 0; i < player.playlists.length; i++) {
    if(player.playlists[i].id>maxP_ID){
      maxP_ID === player.playlists[i].id;
    }
}
newP_ID=maxP_ID;
}
  
  let newPlaylist={
    id:id,
    name:name,
    songs:[]
  }
  player.playlists.push(newPlaylist);
  return newP_ID;
}


function playPlaylist(id) {
  let Pindex=getPlaylistByID(id);
  for (let i = 0; i < Pindex.songs.length; i++) { 
    playSong (Pindex.songs[i]);  
  }
}


function indexSongInPlaylist( playlistId,songId) {
  let playlist = getPlaylistByID(playlistId)
  for (let index = 0; index < playlist.songs.length; index++) {
    if (playlist.songs[index] == songId)
      return index;
  }
  return -1;
}


function songExist(songId){
  for(let i=0;i<player.songs.length;i++){
    if(player.songs[i].id===songId){
      return true;
    }
  }
  return false;
}


function playlistExist(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id == id)
      return true
  }
  return false
}


function editPlaylist(playlistId, songId) {
  let songIndex = indexSongInPlaylist(playlistId, songId)
  let playlist = getPlaylistByID(playlistId)
  if(songExist(songId) && playlistExist(playlistId)){
    if(songIndex == -1){
      playlist.songs.push(songId);
    }
    else if(playlist.songs.length > 1){
      playlist.songs.splice(songIndex,1)
    }
    else{
      removePlaylist(playlist.id)
    }
  }
  else throw new Error("Somthing wrong");
}


function playlistDuration(id) {
  let allDuration=0;
  let playlist=getPlaylistByID(id)
  for(let i=0;i<playlist.songs.length;i++){
    allDuration=allDuration + getSongByID(playlist.songs[i]).duration;
  }
  return allDuration;
}


function searchByQuery(query) {
  query=query.toLowerCase();
  let obj={
    songs:[],
    playlists:[]
  };
  for (let song of player.songs)
  {
    if( (song.title.toLowerCase().includes(query)) || 
        (song.album.toLowerCase().includes(query)) || 
        (song.artist.toLowerCase().includes(query)) )
    {
      obj.songs.push(song);
    }
  }

  for (let playlist of player.playlists)
  {
    if (playlist.name.toLowerCase().includes(query))
    {
      obj.playlists.push(playlist);
    }
  }
  obj.songs.sort(function (a, b) {
    if (a.title < b.title){
       return -1; }
    else if (a.title > b.title){
       return 1; }
    return 0;
  })
  return obj;
}

function searchByDuration(duration) {
  duration = duration.split(":");
  duration = parseInt(duration[0] *60) + parseInt(duration[1]);

  let closest = player.songs[0];
  let defoultClosest = Math.abs(player.songs[0].duration - duration);

  for (let i=0;i<player.songs.length;i++)
  {
    if ( Math.abs(player.songs[i].duration - duration) < defoultClosest  )
    {
      defoultClosest = Math.abs(player.songs[i].duration - duration);
      closest = player.songs[i];
    }
  }
  for (let j=0;j<player.playlists.length;j++)
  {
    if ( Math.abs(playlistDuration(player.playlists[j].id) - duration) < defoultClosest )
    {
      defoultClosest = (playlistDuration(player.playlists[j].id) - duration);
      closest = player.playlists[j];
    }
  }
  return closest
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
