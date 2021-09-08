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
  playSong(song) {},
}

function playSong(id) {
  for (let x of player) {
    id = player.songs[x]
    return id
  }
}

function removeSong(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      player.songs.splice(i, 1)
      break
    }
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].songs.indexOf(id) >= 0) {
      player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id), 1)
      break
    } if(id!== Number) {
      throw `The ID should be a number`
    }
  }
  return player
}

function addSong(title, album, artist, duration, id) {
  player.songs.push(addSong())
}

function removePlaylist(id) {
  for (let z of player) {
    id = player.playlists.slice[z]
    return id
  }
}

function createPlaylist(name, id) {
  player.playlists.push(createPlaylist())
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
