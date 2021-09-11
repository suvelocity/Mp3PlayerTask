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
  // your code here
}

function removeSong(id) {
  // your code here
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

function removePlaylist(id) {
  // your code here
function checkId(songs,id){
  for (let i = 0 ; i < songs.length ; i ++){
    if (id === songs[i].id)
      return true;
  }
  return false;
}

function createPlaylist(name, id) {
  // your code here
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
