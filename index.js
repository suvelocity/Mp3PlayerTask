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
      title: 'As a Rock',
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
      'Playing ${song.title} from ${song.album} by ${song.artist} | ${song.duration}.'
    )
  },
}

function playSong(id) {
  // your code here
}

function durationFormat(duration) {
  let minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (minutes < 10 && seconds < 10) return '0' + minutes + ':' + '0' + seconds
  else if (minutes < 10) return '0' + minutes + ':' + seconds
  else if (seconds < 10) return minutes + ':' + '0' + seconds
  else return minutes + ':' + seconds
}

function checkId(songs, id) {
  //Check if ID existed
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].id === id) return true
  }
  return false
}

function removeSong(id) {
  //remove song by ID
  if (!checkId(player.songs, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.songs.length; i++) {
    //remove from songs
    if (player.songs[i].id === id) {
      player.songs.splice(i, 1)
    }
  }

  for (let j = 0; j < player.playlists.length; j++) {
    // remove from playlists
    for (let k = 0; k < player.playlists[j].songs.length; k++) {
      if (player.playlists[j].songs[k] === id) {
        player.playlists[j].songs.splice(k, 1)
      }
    }
  }
}
function addSong(title, album, artist, duration, id) {
  // your code here
}

function removePlaylist(id) {
  if (!checkId(player.playlists, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) player.playlists.splice(i, 1)
  }
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
  //Don't touch ben tipagach
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
