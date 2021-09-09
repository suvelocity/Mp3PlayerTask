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
    console.log("Playing "+song.title+" from "+song.album+" by "+song.artist+" | "+toCorrectDuration(song.duration)+".")
  },
}

function toCorrectDuration(seconds){
  let mm;
  if(Math.floor(seconds/60)<10) mm=`0${Math.floor(seconds/60)}`;
  else mm=`${Math.floor(seconds/60)}`;
  let ss;
  if(Math.floor(seconds%60)<10) ss=`0${Math.floor(seconds%60)}`;
  else ss=`${Math.floor(seconds%60)}`;
  return mm+":"+ss;
}

function songById(id){
  let songObj=player.songs.find(x=> x.id===id);
  if (songObj===undefined){
    throw "Not a Valid ID"
  }
  return songObj;
}

function playlistById(id){
  let playlistObj=player.playlists.find(x=> x.id===id);
  if (playlistObj===undefined){
    throw "Not a Valid ID"
  }
  return playlistObj;
}

function songIndex(song){
  let index=player.songs.indexOf(song);
  return index
}

function playlistIndex(playlist){
  let index=player.playlists.indexOf(playlist);
  return index;
}

function newId(obj){
  let maxId=0;
  for (let i of obj){
    if(i.id>maxId) maxId=i.id;
  }
  return maxId+1;
}

function durationToSeconds(str){
  let duration=(parseInt(str.slice(0,2))*60)+parseInt(str.slice((str.length-2),(str.length)));
  return duration;
}

function playSong(id) {
  let songObj=songById(id);
  player.playSong(songObj);
}

function removeSong(id) {
  let songId=songIndex(songById(id));
  player.songs.splice(songId,1)
  for(let list of player.playlists){
    list.songs.splice(list.songs.indexOf(id),1)
  }
}

function addSong(title, album, artist, duration, id=newId(player.songs)) {
  if(player.songs.find(x=> x.id===id)){
    throw "ID is taken"
  }
  let obj={
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: durationToSeconds(duration) ,
  }
  player.songs.push(obj)
  return id;
}

function removePlaylist(id) {
  let playlistId=playlistIndex(playlistById(id));
  player.playlists.splice(playlistId,1)
}

function createPlaylist(name, id=newId(player.playlists)) {
  if(player.playlists.find(x=> x.id===id)){
    throw "ID is taken"
  }
  let obj={
    id: id,
    name: name,
    songs: []
  }
  player.playlists.push(obj)
  return id;
}

function playPlaylist(id) {
  let playlist=playlistById(id);
  for(let id of playlist.songs){
    playSong(id)
  }
}

function editPlaylist(playlistId, songId) {
  songById(songId);
  let playlist=playlistById(playlistId);
  let index=playlistIndex(playlist);
  for(let i=0;i<playlist.songs.length;i++){
    if (playlist.songs[i]===songId){
      player.playlists[index].songs.splice(i,1)
      if(player.playlists[index].songs.length===0){
        removePlaylist(playlistId);
      }
    } else{
      player.playlists[index].songs.push(songId)
    }
  }
}

function playlistDuration(id) {
  let sumDuration=0;
  let playlist=playlistById(id);
  for(let i=0;i<playlist.songs.length;i++){
    sumDuration+=player.songs[songIndex(songById(playlist.songs[i]))].duration;
  }
  return sumDuration;
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
