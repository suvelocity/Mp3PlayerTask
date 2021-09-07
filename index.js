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
    { id: 5, name: 'Israeli', songs: [2] },
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
  duration = oppositOfdurationFormat(duration)
  player.songs.push({
    title,
    album,
    artist,
    duration,
    id,
  })
  return id
}

addSong('Shugi', 'Booby', 'Kooky', '04:24', 22)
console.log(player.songs[6])

function removePlaylist(id) {
  if (!checkId(player.playlists, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      player.playlists.splice(i, 1) //-- ?למה שניהם עובדים לעזאזל
      // delete player.playlists.splice(i, 1)
    }
  }
}

function createPlaylist(name, id = generateNewId()) {
  if (checkId(player.playlists, id))
    throw new Error('ID already exist, change the ID or omit it')
  player.playlists.push({ name, id, songs: [] })
  return id
}

function playPlaylist(id) {
  if (!checkId(player.playlists, id))
    throw new Error("ID isn't exist, change the ID")
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
  if (!checkId(player.songs, songId))
    throw new Error("ID isn't exist, change the ID")
  if (!checkId(player.playlists, playlistId))
    throw new Error("ID isn't exist, change the ID")
  let savePlaylist
  for (let i = 0; i < player.playlists.length; i++) {
    if (playlistId === player.playlists[i].id)
      savePlaylist = player.playlists[i]
  }
  //runs on the playlists
  for (let j = 0; j < savePlaylist.songs.length; j++) {
    //runs on the songs array in the playlist
    if (songId === savePlaylist.songs[j]) {
      //If the song ID exists in the playlist
      removeSongsFromPlaylist(songId)
      //removes it
    } else {
      savePlaylist.songs.push(songId)
    }
    if (savePlaylist.songs.length === 0) {
      //If it was the only song in the playlist
      removePlaylist(savePlaylist.id)
    }
  }
}

// editPlaylist(5, 2)
// console.log(player.playlists[0])
// console.log(player.playlists[1])

function playlistDuration(id) {
  let save = 0
  let sum = 0
  for (let i = 0; i < player.playlists.length; i++) {
    if (id === player.playlists[i].id)
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        save = player.playlists[i].songs[j]
        for (let t = 0; t < player.songs.length; t++) {
          if (player.songs[t].id === save) sum += player.songs[t].duration
        }
      }
  }
  return sum
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  duration = oppositOfdurationFormat(duration)
  let minDuartion = Math.abs(duration - player.songs[0].duration)
  let saveI = 0
  for (let i = 0; i < player.songs.length; i++) {
    if (minDuartion > Math.abs(minDuartion - player.songs[i].duration))
      minDuartion = Math.abs(minDuartion - player.songs[i].duration)
    saveI = i
  }
  console.log(minDuartion)
  console.log(saveI)
  return player.songs[saveI]
}

searchByDuration('17:25')

//////////////////////////////////////---  Helper Functions(Start) ---////////////////////////////////////////////////////

function removeSongsFromPlaylist(id) {
  //this function remove a song only from the playlist and not from the songs object
  for (let j = 0; j < player.playlists.length; j++) {
    // remove from playlists
    for (let k = 0; k < player.playlists[j].songs.length; k++) {
      if (player.playlists[j].songs[k] === id) {
        player.playlists[j].songs.splice(k, 1)
      }
    }
  }
}

function durationFormat(duration) {
  //converting to mm:ss format
  let minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (minutes < 10 && seconds < 10) return '0' + minutes + ':' + '0' + seconds
  else if (minutes < 10) return '0' + minutes + ':' + seconds
  else if (seconds < 10) return minutes + ':' + '0' + seconds
  else return minutes + ':' + seconds
}

function oppositOfdurationFormat(duration) {
  //converting mm:ss to seconds
  duration = duration.split(':')
  console.log(duration)
  let minutes = parseInt(duration[0]) * 60
  let seconds = parseInt(duration[1])
  return minutes + seconds
}

function checkId(songs, id) {
  //Check if ID existed
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].id === id) return true
  }
  return false
}

function biggestId() {
  //the function return the biggest ID from thw array
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
