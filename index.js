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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration(song.duration)}.`)
  }
}

function getSongById(id) {
  for (let key of player.songs) {
    if (key.id === id) {
      return key
    }
  }
}
function convertDuration(num) {
  let mins = Math.floor(num / 60)
  let sec = num % 60
  return `${mins}:${sec}`
  
}
function playSong(id) {
  
}


function removeSong(id) {
  const removeIndexSongs = player.songs.findIndex( item => item.id === id );
  if (removeIndexSongs === -1)  {
    throw new Error('id not found');
  }
  player.songs.splice( removeIndexSongs, 1 ); //remove from songs 
  for (let i of player.playlists) {
    let arr = i.songs;
    if (arr.includes(id)){
      i.songs.splice(arr.indexOf(id), 1); //remove from playlists
    }
  }
}

function getListOfId() {
  let arrayOfId = [];
  for (let i of player.songs) {
    arrayOfId.push(i["id"]);
  }
  return arrayOfId;
}

function addSong(title, album, artist, duration, id) {
  let newSong = {}
  player.songs.push(newSong.id = id, )
}
addSong()

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
