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
  if (!checkId(player.songs, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.songs.length; i++) {
    //runs on the songs array
    if (player.songs[i].id === id) {
      player.playSong(player.songs[i])
    }
  }
}

function removeSong(id) {
  if (!checkId(player.songs, id)) throw new Error('ID is not found')
  for (let i = 0; i < player.songs.length; i++) {
    //runs on the songs array
    //remove from songs
    if (player.songs[i].id === id) {
      player.songs.splice(i, 1)
    }
  }
  removeSongsFromPlaylist(id)
}

function addSong(title, album, artist, duration, id = generateNewId()) {
  if (checkId(player.songs, id))
    throw new Error('ID already exist, change the ID or omit it')
  duration = oppositOfdurationFormat(duration) //convert from mm:ss format to seconds
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
  let correctPlaylist = findPlaylistById(id)
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
  let correctPlaylist = findPlaylistById(id)
  for (let j = 0; j < correctPlaylist.songs.length; j++) {
    //run on the songs array inside the wanted playlist
    playSong(correctPlaylist.songs[j])
  }
  return id
}

function editPlaylist(playlistId, songId) {
  if (!checkId(player.songs, songId))
    throw new Error("ID isn't exist, change the ID")
  if (!checkId(player.playlists, playlistId))
    throw new Error("ID isn't exist, change the ID")
  let correctPlaylist = findPlaylistById(playlistId)
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
      removePlaylist(correctPlaylist.id) //remove this playlist
    }
  }
}

function playlistDuration(id) {
  let correctPlaylist = findPlaylistById(id) //correctPlaylist contain the wanted playlist
  let save = 0,
    sum = 0
  for (let i = 0; i < correctPlaylist.songs.length; i++) {
    //run on the songs array inside this playlist
    save = correctPlaylist.songs[i]
    for (let j = 0; j < player.songs.length; j++) {
      //run on the songs array
      if (player.songs[j].id === save) sum += player.songs[j].duration
    }
  }
  return sum
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
    //for songs
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
  duration = oppositOfdurationFormat(duration) //convert from mm:ss format to seconds
  let arrSongs = arrLengthSongs(duration) //arrSongs contain array that look like this: [ closest-duartion-for-song , the-object-himself(song) ]
  let arrPlaylist = arrLengthPlaylist(duration) //arrPlaylist contain array that look like this: [ closest-duartion-for-playlist , the-object-himself(playlist) ]
  return arrSongs[0] < arrPlaylist[0] ? arrSongs[1] : arrPlaylist[1]
}

////////////////////////////////////////////////---  Help Functions(Start) ---////////////////////////////////////////////////////

function arrLengthSongs(duration) {
  //gets song duartion return array of [closet-duration-song-in-seconds , closet-duration-song-the-object-himself(song)]
  let arr = []
  let minDuration = duration,
    index = 0
  for (let i = 0; i < player.songs.length; i++) {
    //run on the songs array
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
  //gets playlist duartion return array of [closet-duration-playlist-in-seconds , closet-duration-playlist-the-object-himself(playlist)]
  let arr = []
  let minDuration = duration,
    index = 0
  for (let i = 0; i < player.playlists.length; i++) {
    //run on playlists array
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

function findPlaylistById(id) {
  //Get a playlist id and return the wanted playlist by his id
  let correctPlaylist
  for (let i = 0; i < player.playlists.length; i++) {
    //run on playlists array
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
  //converting from seconds to mm:ss format
  let minutes = Math.floor(duration / 60)
  let seconds = duration % 60
  if (minutes < 10 && seconds < 10) return '0' + minutes + ':' + '0' + seconds
  else if (minutes < 10) return '0' + minutes + ':' + seconds
  else if (seconds < 10) return minutes + ':' + '0' + seconds
  else return minutes + ':' + seconds
}

function oppositOfdurationFormat(duration) {
  //convert from mm:ss format to seconds
  duration = duration.split(':')
  let minutes = parseInt(duration[0]) * 60
  let seconds = parseInt(duration[1])
  return minutes + seconds
}

function checkId(songs, id) {
  //Check if ID existed
  for (let i = 0; i < songs.length; i++) {
    //run on songs array
    if (songs[i].id === id) return true
  }
  return false
}

function biggestId() {
  //the function return the biggest ID from thw array
  let max = player.songs[0].id
  for (let i = 0; i < player.songs.length; i++) {
    //run on songs array
    if (max < player.songs[i].id) max = player.songs[i].id
  }
  return max
}

function generateNewId() {
  //generate new ID
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
