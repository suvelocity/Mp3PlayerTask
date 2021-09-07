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

function removePlaylist(id) {
  if (!checkId(player.playlists, id)) throw new Error('ID is not found')
  let correctPlaylist = findPlaylistId(id)
  player.playlists.splice(correctPlaylist, 1)
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
  let correctPlaylist = findPlaylistId(id)
  for (let j = 0; j < correctPlaylist.songs.length; j++) {
    playSong(correctPlaylist.songs[j])
  }
  return id
}

function editPlaylist(playlistId, songId) {
  if (!checkId(player.songs, songId))
    throw new Error("ID isn't exist, change the ID")
  if (!checkId(player.playlists, playlistId))
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

// editPlaylist(5, 2)
// console.log(player.playlists[0])
// console.log(player.playlists[1])

function playlistDuration(id) {
  let correctPlaylist = findPlaylistId(id)
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

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  duration = oppositOfdurationFormat(duration)
  let arrSongs = arrLengthSongs(duration)
  let arrPlaylist = arrLengthmPlaylist(duration)
  console.log(arrSongs[0])
  console.log(arrPlaylist[0])
  console.log(arrSongs[1])
  console.log(arrPlaylist[1])
  // return arrSongs[0] < arrPlaylist[0] ? arrSongs[1] : arrPlaylist[1]
  if (arrSongs[0] < arrPlaylist[0]) {
    return arrSongs[1]
  }
  return arrPlaylist[1]
}

console.log(searchByDuration('10:00'))

////////////////////////////////////////////////---  Help Functions(Start) ---////////////////////////////////////////////////////

function arrLengthSongs(duration) {
  //gets song duartion return array of [closet-duration-seconds,closet-duration-song]
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

function arrLengthmPlaylist(duration) {
  //gets playlist duartion return the closest playlist duration
  let arr = []
  let minDuration = duration,
    index = 0
  for (let i = 0; i < player.playlists.length; i++) {
    if (
      minDuration >
      Math.abs(duration - sumDurationPlaylist(player.playlists[i].id))
    ) {
      minDuration = Math.abs(
        duration - sumDurationPlaylist(player.playlists[i].id)
      )
      index = i
    }
  }
  arr.push(minDuration)
  arr.push(player.playlists[index])
  return arr
}

function sumDurationPlaylist(id) {
  //gets id of playlist and return his sum of duration
  let correctPlaylist = findPlaylistById(id)
  let sum = 0
  let tempArr = correctPlaylist.songs.slice(0, correctPlaylist.songs.length)
  for (let i = 0; i < tempArr.length; i++) {
    sum += songsDurationById(tempArr[i])
  }
  return sum
}

function findPlaylistById(id) {
  //gets id of playlist and return the playlist
  let savePlaylist
  for (let i = 0; i < player.playlists.length; i++) {
    if (id === player.playlists[i].id) savePlaylist = player.playlists[i]
  }
  return savePlaylist
}

function songsDurationById(id) {
  //gets id of song and return his duration
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) return player.songs[i].duration
  }
}

function findPlaylistId(id) {
  //Get a playlist id and return
  let correctPlaylist
  for (let i = 0; i < player.playlists.length; i++) {
    if (id === player.playlists[i].id) correctPlaylist = player.playlists[i]
  }
  return correctPlaylist
}

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

/////////////////////////////////////////////////---  Help Functions(End) ---////////////////////////////////////////////////////

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
