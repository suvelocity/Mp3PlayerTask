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
 for (let i=0;i<player.songs.length ;i++){
   if (player.songs[i].id===id){
     return player.songs[i]
   }
 }
 throw ("non-existent ID,try another one")
}

function removeSong(id) {
  let a=0;
    for(let x=0;x<player.songs.length ;x++){
      if (player.songs[x].id===id) a=1}
    if (a===0)
      throw ("non-existent ID,try another one");
  for (let i=0;i<player.songs.length ;i++){
    if (player.songs[i].id===id){
      player.songs.splice(i,1)
    }
  }
  for (let i=0;i<player.playlists.length;i++){
    for (let j=0;j<player.playlists[i].songs.length;j++){
      if (player.playlists[i].songs[j]===id)
        player.playlists[i].songs.splice(j,1);
    }
  }
}

function addSong(title, album, artist, duration, id=12) {
  player.songs.push({"id":id,
                    "title":title,
                     "album":album,
                     "artist":artist,
                     "duration":duration,
                    })
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
