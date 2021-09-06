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
      'Playing ' +
        song.title +
        ' from ' +
        song.album +
        ' by ' +
        song.artist +
        ' | ' +
        durationFormat(song.duration) +
        '.'
    )
  },
}

function playSong(id) {
  //play the requested song by his ID
  if (!checkId(player.songs, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      player.playSong(player.songs[i])
    }
  }
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

function addSong(title, album, artist, duration, id = generateNewId()) {
  if (checkId(player.songs, id))
    throw new Error('ID already exist, change the ID or omit it')
  duration = durationFormat(duration)
  player.songs.push({
    title,
    album,
    artist,
    duration,
    id,
  })
  return id
}

function removePlaylist(id) {
  if (!checkId(player.playlists, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) player.playlists.splice(i, 1)
  }
}

function createPlaylist(name, id = generateNewId()) {
  if (checkId(player.playlists, id))
    throw new Error('ID already exist, change the ID or omit it')
  player.playlists.push({ name, id })
  return id
}

function playPlaylist(id) {
  if (!checkId(player.playlists, id))
    throw new Error("ID already isn't exist, change the ID or omit it")
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        playSong(player.playlists[i].songs[j])
      }
    }
  }
  return id
}

function editPlaylist(playlistId, songId) {
  let count = 0
  // if (!checkId(player.songs, songId))
  //   throw new Error('ID already isn\'t exist, change the ID or omit it')
  // if (!checkId(player.playlists, playlistId))
  //   throw new Error('ID already isn\'t exist, change the ID or omit it')
  for (let i = 0; i < player.playlists.length; i++) {
    for (let j = 0; j < player.playlists[i].songs.length; j++) {
      if (player.playlists[i].songs[j] === songId) {
        count++
        removeSong(songId)
      }
    }
    if (count === 0) {
      player.playlists[i].songs.push(songId)
    }
    count = 0
  }
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

//////////////////////////////////////---  Helper Functions(Start) ---////////////////////////////////////////////////////

function durationFormat(duration) {
  //converting to mm:ss format
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

function biggestId() {
  //the function return the biggest ID
  let max = player.songs[0].id
  for (let i = 0; i < player.songs.length; i++) {
    if (max < player.songs[i].id) max = player.songs[i].id
  }
  return max
}

function generateNewId() {
  //generates6 new ID
  return biggestId() + 1
}

//////////////////////////////////////---  Helper Functions(End) ---////////////////////////////////////////////////////

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
