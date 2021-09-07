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

//presen according the mm:ss format
function durationFormat(duration) {
  let minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (minutes < 10 && seconds < 10) {
    return '0' + minutes + ':0' + seconds
  } else if (minutes < 10) {
    return '0' + minutes + ':' + seconds
  } else if (seconds < 10) {
    return minutes + ':0' + seconds
  }
  return minutes + ':' + seconds
}

//function to check if id is exist in song
function isIdExist(playerSong, id) {
  for (let i = 0; i < playerSong.length; i++) {
    if (playerSong[i].id === id) {
      return true
    }
  }
  return false
}

//return the max id from tae array songs
function maxId() {
  let max = player.songs[0].id
  for (let i = 0; i < player.songs.length; i++) {
    if (max < player.songs[i].id) {
      max = arr[i].id
    }
  }
  return max
}

//create new id
function newId() {
  return maxId() + 1
}

//converting mm:ss to seconds
function oppositDuration(duration) {
  duration = duration.split(':')
  console.log(duration)
  let minutes = parseInt(duration[0]) * 60
  let seconds = parseInt(duration[1])
  return minutes + seconds
}

//Get a playlist id and return
function findPlaylistId(id) {
  let correctPlaylist
  for (let i = 0; i < player.playlists.length; i++) {
    if (id === player.playlists[i].id) correctPlaylist = player.playlists[i]
  }
  return correctPlaylist
}

//this function remove a song only from the playlist and not from the songs object
function removeSongsFromPlaylist(id) {
  for (let j = 0; j < player.playlists.length; j++) {
    // remove from playlists
    for (let k = 0; k < player.playlists[j].songs.length; k++) {
      if (player.playlists[j].songs[k] === id) {
        player.playlists[j].songs.splice(k, 1)
      }
    }
  }
}

//gets song duartion return array of [closet-duration-seconds,closet-duration-playlist]
function arrLengthmPlaylist(duration) {
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

//gets song duartion return array of [closet-duration-seconds,closet-duration-song]
function arrLengthSongs(duration) {
  let arr = []
  let minDuration = duration,
    index = 0 //{id: 3,title: "Thunderstruck", album: "The Razors Edge"}
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

///////////////////////////////////////////////////////////////////////////

function playSong(id) {
  if (!isIdExist(player.songs, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      player.playSong(player.songs[i])
    }
  }
}

function removeSong(id) {
  if (!isIdExist(player.songs, id)) {
    throw new error('ID is not exist')
  }

  for (let i = 0; i < player.songs.length; i++) {
    //remove id from songs
    if (player.songs[i].id === id) {
      player.songs.splice(i, 1)
    }
  }
  for (let j = 0; j < player.playlists.length; j++) {
    //remove id from playlist
    for (let k = 0; k < player.playlists[j].songs.length; k++) {
      if (player.playlists[j].songs[k] === id) {
        player.playlists[j].songs.splice(k, 1)
      }
    }
  }
}

function addSong(title, album, artist, duration, id = newId()) {
  if (isIdExist(player.songs, id)) throw new Error('ID is already exist')
  duration = oppositDuration(duration)
  player.songs.push({ title, album, artist, duration, id })
  return id
}

function removePlaylist(id) {
  if (!isIdExist(player.playlists, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) player.playlists.splice(i, 1)
  }
}

function createPlaylist(name, id = newId()) {
  if (isIdExist(player.playlists, id)) throw new Error('ID is already exist')
  player.playlists.push({ name, id, songs: [] })
  return id
}

function playPlaylist(id) {
  if (!isIdExist(player.playlists, id))
    throw new Error('ID already exist, change the ID or omit it')
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
  if (!isIdExist(player.songs, songId))
    throw new Error("ID isn't exist, change the ID")
  if (!isIdExist(player.playlists, playlistId))
    throw new Error("ID isn't exist, change the ID")
  let correctPlaylist = findPlaylistId(playlistId)
  //runs on the playlists
  for (let j = 0; j < correctPlaylist.songs.length; j++) {
    //runs on the songs array in the playlist
    if (songId === correctPlaylist.songs[j]) {
      //If the song ID exists in the playlist
      removeSongsFromPlaylist(songId)
      //removes it
    } else {
      correctPlaylist.songs.push(songId)
    }
    if (correctPlaylist.songs.length === 0) {
      //If it was the only song in the playlist
      removePlaylist(correctPlaylist.id)
    }
  }
}

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
  const results = { songs: [], playlists: [] }
  let querylower = query.toLowerCase()
  for (let i = 0; i < player.songs.length; i++) {
    if (
      player.songs[i].album.toLowerCase().includes(querylower) ||
      player.songs[i].artist.toLowerCase().includes(querylower) ||
      player.songs[i].title.toLowerCase().includes(querylower)
    ) {
      results.songs.push(player.songs[i])
      results.songs.sort((a, b) => {
        if (a['title'].toLowerCase() < b['title'].toLowerCase()) return -1
      })
    }
  }

  for (let j = 0; j < player.playlists.length; j++) {
    if (player.playlists[j].name.toLowerCase().includes(querylower)) {
      results.playlists.push(player.playlists[j])
      results.playlists.sort((a, b) => {
        if (a['name'].toLowerCase() < b['name'].toLowerCase()) return -1
      })
    }
  }
  return results
}

function searchByDuration(duration) {
  duration = oppositDuration(duration)
  let arrSongs = arrLengthSongs(duration)
  let arrPlaylist = arrLengthmPlaylist(duration)
  console.log(arrSongs)
  console.log(arrPlaylist)
  return arrSongs[0] < arrPlaylist[0] ? arrSongs[1] : arrPlaylist[1]
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
