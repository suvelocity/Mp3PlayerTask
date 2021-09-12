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
    console.log(`Playing ${song.title} from ${song.album} by ${(song.artist)} | ${convertDuration(song.duration)}.`)
  },
}

function playSong(id) {
  let song = getSongById(id);

  return player.playSong(song);
}

function removeSong(id) {
  //remove sng from songs list
  let songIndex = player.songs.indexOf(getSongById(id))
  player.songs.splice(songIndex,1);

  //remove song from all playlists
  for(let i=0; i<player.playlists.length; i++){             //iterate playlists
    for(let j=0; j<player.playlists[i].songs.length; j++){  //iterate songs id in playlist
      if(player.playlists[i].songs[j] == id){
        player.playlists[i].songs.splice(j,1);
      }
    }
  }
}

function addSong(title, album, artist, duration, id = Math.floor(Math.random() * 1000) + 1) {
  if(!songIdExist(id)){
    player.songs.push({id: id,
                    title: title,
                    album: album,
                    artist: artist,
                    duration: convertToSeconds(duration)})
      return id
      }
  else{
    throw new Error("This ID already exists")
  }
}

function removePlaylist(id) {
  let playlistIndex = player.playlists.indexOf(getPlaylistById(id))
  player.playlists.splice(playlistIndex, 1);
}

function createPlaylist(name, id = Math.floor(Math.random() * 1000) + 1) {
  if (!playlistIdExist(id)){
    player.playlists.push({id: id,
                           name: name,
                           songs:[]});
    return id;
  }
  else{
    throw new Error("This ID already exists")
  }
}

function playPlaylist(id) {
  let playlist = getPlaylistById(id);
  for(let i=0; i<playlist.songs.length; i++){
    playSong(playlist.songs[i])
  }
}

function editPlaylist(playlistId, songId) {
  let songIndex = findSongInPlaylist(songId, playlistId)
  let playlist = getPlaylistById(playlistId)

  if(songIdExist(songId) && playlistIdExist(playlistId)){ //checks if both song and playlist exist
    if(songIndex == -1) {                         //checks if the song is not in the list
      playlist.songs.push(songId);
    }
    else if(playlist.songs.length > 1){         //checks if the song is not the only song in the playlist
      playlist.songs.splice(songIndex,1)
    }
    else{
      removePlaylist(playlist.id)
    }
  }
  else{
    throw new Error("No such ID");
  }
}

function playlistDuration(id) {
  let playlist = getPlaylistById(id)
  let sum = 0

  for(let i=0; i<playlist.songs.length; i++){
    sum += getSongById(playlist.songs[i]).duration
  }
  return sum
}

function searchByQuery(query) {
  let results={
    songs :[],
    playlists : []
  }

  //search for songs containing query
  for(let song of player.songs){
    if(song.title.includes(query) || song.album.includes(query) || song.artist.includes(query)){
      results.songs.push(song)
    }
  }
  //sort songs array by title
  results.songs.sort(function (a, b) {
    if (a.title < b.title){
       return -1; }
    else if (a.title > b.title){
       return 1; }
    return 0;
  })

  //search for songs containing query
  for(let playlist of player.playlists){
    if(playlist.name.includes(query)){
      results.playlists.push(playlist)
    }
  }
  //sort playlist array by name
  results.playlists.sort(function (a, b) {
    if (a.name < b.name){
       return -1; }
    if (a.name > b.name){
       return 1; }
    return 0;
  })

  return results
}

function searchByDuration(duration) {
  let time = convertToSeconds(duration);
  let closestObj;
  let deltaTime;

  //set delta time according to bigger delta 
  if (time > player.songs[0].duration){
    deltaTime = time;
  }
  else{
    deltaTime = player.songs[0].duration;
  }

  //search in songs
  for(let song of player.songs){
    if(Math.abs(time - song.duration) < deltaTime){
      closestObj = song;
      deltaTime = Math.abs(time - song.duration);
    }
  }

  //search in playlists
  for (let playlist of player.playlists) {
    if (Math.abs(time - playlistDuration(playlist.id)) < deltaTime) {
      closestObj = playlist;
      deltaTime = Math.abs(time - playlistDuration(playlist.id));
    }
  }

  return closestObj
}

function convertDuration(duration) {
  let min = Math.floor(duration / 60);
  let sec = duration % 60;

  if (min < 10) {
    min = "0" + String(min);
  }
  if (sec < 10) {
    sec = "0" + String(sec);
  }

  return min + ':' + sec
}

function convertToSeconds(duration) {
  let arr = duration.split(":")
  let min = parseInt(arr[0]) * 60
  let sec = parseInt(arr[1])

  return min + sec
}

function getSongById(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id == id)
      return player.songs[i]
  }

  throw new Error("No such ID");
}

function getPlaylistById(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id == id)
      return player.playlists[i]
  }

  throw new Error("No such ID");
}

function songIdExist(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id == id)
      return true
  }
  return false
}

function playlistIdExist(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id == id)
      return true
  }
  return false
}

function findSongInPlaylist(songId, playlistId) {
  let playlist = getPlaylistById(playlistId)
  for (let index = 0; index < playlist.songs.length; index++) {
    if (playlist.songs[index] == songId)
      return index
  }
  return -1
}

function createPlaylistByArtist(artist){
  let playlist = getPlaylistById(createPlaylist(`${artist} Playlist`))
  for(let song of player.songs){
    if(song.artist == artist){
      playlist.songs.push(song)
    }
  }
  return playlist
}

function repeatSong(repeats,songId){
  for(let i=1; i<=repeats; i++){
    playSong(songId)
  }
}

function repeatPlaylist(repeats,playlistId){
  for(let i=1; i<=repeats; i++){
    playPlaylist(playlistId)
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
