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
    console.log(
      "Playing " + song.title 
      +" from " + song.album 
      + " by " + song.artist 
      + " | " 
      + durationFormat(song.duration) 
      +".")
  },
}

function playSong(id) {

  if (!(checkId(player.songs,id))) throw "ERROR: id doesn't exict.";
  else for(let i = 0 ; i < player.songs.length ; i ++){
    if (player.songs[i].id === id)
      return player.playSong(player.songs[i]);
  } 
}

function durationFormat(duration){
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  if(minutes < 10 && seconds < 10)
    return "0"+minutes+":"+"0"+seconds;

    else if (minutes < 10) return "0"+minutes+":"+seconds;
         else if (seconds < 10) return minutes+":0"+seconds;
              else return minutes+":"+seconds;
}

function checkId(songs,id){
  for (let i = 0 ; i < songs.length ; i ++){
    if (id === songs[i].id)
      return true;
  }
  return false;
}

function playlistDuration(id) {

  let correctPlaylist = findPlaylistById(id) //correctPlaylist contain the wanted playlist
  let save = 0,
    sum = 0
  for (let i = 0; i < correctPlaylist.songs.length; i++) {
    save = correctPlaylist.songs[i]
    for (let j = 0; j < player.songs.length; j++) {
      if (player.songs[j].id === save) sum += player.songs[j].duration
    }
  }
  return sum
}

function findPlaylistById(id) {
  let correctPlaylist
  for (let i = 0; i < player.playlists.length; i++) {
    if (id === player.playlists[i].id) correctPlaylist = player.playlists[i]
  }
  return correctPlaylist
}

function editPlaylist(playlistId, songId) {
  if (!checkId(player.playlists, playlistId)){
    throw "ID of the playlist doesn't exist."
  }
  if (!checkId(player.songs, songId)){
      throw "ID of the song doesn't exist."
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if (playlistId === player.playlists[i].id){
      for (let x = 0; x < player.playlists[i].songs.length; x++) {
        if (songId === player.playlists[i].songs[x]){
            player.playlists[i].songs.splice(x,1);
            }
          else 
                  player.playlists[i].songs.push(songId);
            }
          if (player.playlists[i].songs.length === 0)
             removePlaylist(player.playlists[i].id);
        }
      }
}

function newId(arr){
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i].id)
    max = arr[i].id;   
  }
    return max+1;
}

function oppDuration(duration){
  duration = duration.split(':')
  let minutes = parseInt(duration[0]) * 60
  let seconds = parseInt(duration[1])
  return minutes + seconds
}

function addSong(title, album, artist, duration,  id = newId(player.songs)) {
  if (checkId(player.songs, id)){
    throw "ID exists"
  }
  duration= oppDuration(duration);
  let newSong = {id: id, title: title, album: album, artist: artist, duration: duration};
  player.songs.push(newSong)
  return id;
}

function removeSong(id) {
  if (!checkId(player.songs, id)){
    throw "ID doesn't exist.";
  }
  for (let i = 0; i<player.songs.length; i++){
    if (player.songs[i].id === id){
      player.songs.splice(i,1)
    }
  }
  for (let j = 0; j<player.playlists.length; j++){
    for(let x = 0; x<player.playlists[j].songs.length; x++){
      if (player.playlists[j].songs[x] === id){
        player.playlists[j].songs.splice(x, 1);
      }
    }
  }
}

function removePlaylist(id) {
  if (!checkId(player.playlists, id)){
    throw "ID doesn't exist.";
  }
  for (let i = 0; i<player.playlists.length; i++){
    if (player.playlists[i].id === id){
      player.playlists.splice(i, 1);
    }
  }
}

function createPlaylist(name, id = newId(player.playlists)) {
  if (checkId(player.playlists, id)){
    throw "ID is taken"
  }
  let newPlaylist = { id: id, name: name, songs: []}
  player.playlists.push(newPlaylist)
  return id;
}

function playPlaylist(id) {
  if (!checkId(player.playlists, id)){
    throw "ID dont exist"
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if(id === player.playlists[i].id){
      for (let x = 0; x < player.playlists[i].songs.length; x++) {
          playSong(player.playlists[i].songs[x]);
      }
    }
  }
  return id;
}


function searchByQuery(query) {
  let tempQuery = query.toUpperCase()
  const results = { songs: [], playlists: [] }
  for (let i = 0; i < player.playlists.length; i++) {
    //for playlists
    if (player.playlists[i].name.toUpperCase().includes(tempQuery)) {
      results.playlists.push(player.playlists[i])
      results.playlists.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
      })
    }
  }
  for (let i = 0; i < player.songs.length; i++) {
    if (
      player.songs[i].album.toUpperCase().includes(tempQuery) ||
      player.songs[i].artist.toUpperCase().includes(tempQuery) ||
      player.songs[i].title.toUpperCase().includes(tempQuery)
    ) {
      results.songs.push(player.songs[i])
      results.songs.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1
      })
    }
  }
  return results
}

function searchByDuration(duration) {
  duration = oppDuration(duration) 
  let arrSongs = arrLengthSongs(duration) 
  let arrPlaylist = arrLengthPlaylist(duration)
  return arrSongs[0] < arrPlaylist[0] ? arrSongs[1] : arrPlaylist[1]
}

function arrLengthSongs(duration) {
  let arr = []
  let minDuration = duration,
    index = 0
  for (let i = 0; i < player.songs.length; i++) {
    if (minDuration > Math.abs(duration - player.songs[i].duration)) {
      minDuration = Math.abs(duration - player.songs[i].duration)
      index = i
    }
  }
  arr.push(minDuration)
  arr.push(player.songs[index])
  return arr
}

function arrLengthPlaylist(duration) {
  let arr = []
  let minDuration = duration,
    index = 0
  for (let i = 0; i < player.playlists.length; i++) {
    if (
      minDuration >
      Math.abs(duration - playlistDuration(player.playlists[i].id))
    ) {
      minDuration = Math.abs(
        duration - playlistDuration(player.playlists[i].id)
      )
      index = i
    }
  }
  arr.push(minDuration)
  arr.push(player.playlists[index])
  return arr
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
