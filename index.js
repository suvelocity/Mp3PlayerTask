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
  // playSong(song) {

  // },
}

function playSong(id) {
  getSongFromId(id)
  console.log(
    `playing ${title} from ${album} by ${artist} | ${convertDuration(
      duration
    )}.`
  )
}
function getSongFromId(id) {
  for (let i = 0; i < player.songss.length; i++) {
    if (player.songs[i].id === id) {
      return (
        ({ title, album, artist, duration } = player.songs[i]),
        (songArrinedx = i)
      )
    }
  }
  throw `please enter valid id`
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
    }
    if (id !== Number) {
      throw `The ID should be a number`
    }
  }
  return player
}
function convertDuration(time) {
  let min = Math.floor(time / 60)
  let sec = 0
  let finalTime = ``
  if (time % 60 === 0 && time / 60 < 10) {
    finalTime = `0` + time / 60 + `:00`
  } else if (time % 60 === 0 && time / 60 > 10) {
    finalTime = time / 60 + `:00`
  } else if (time % 60 !== 0 && min < 10) {
    finalTime = `0` + min + `:0` + (time % 60)
  } else if (time % 60 !== 0 && min > 10) {
    finalTime = min + `:` + (time % 60)
  } else if (time % 60 !== 0) {
    finalTime = `00:` + (time % 60)
  }
  return finalTime
}
function idGen(id) {
  if (id === undefined) {
    let maxId = 0
    for (let i = 0; i < player.songs.length; i++) {
      if (maxId < player.songs[i].id) {
        maxId = player.songs[i].id
      }
    }
    return maxId + 1
  }
}
function addSong(title, album, artist, duration, id = idGen()) {
  for (let i = 0; i < player.songs.length; i++) {
    if (id === player.songs[i].id) {
      throw `The ID is taken`
    }
  }

  player.songs.push({
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: convertDuration(duration),
  })
  return id
}

function removePlaylist(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      player.playlists.splice(i, 1)
    } else if (player.playlists[i].id !== id) {
      throw 'non-existent ID'
    }
  }
}
function idGenerotor(id) {
  if (id === undefined) {
    let maxIds = 0
    for (let i = 0; i < player.playlists.length; i++) {
      if (maxIds < player.playlists[i].id) {
        maxIds = player.playlists[i].id
      }
    }
    return maxIds + 1
  }
}

function createPlaylist(name, id = idGenerotor(), newSongs) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (id === player.playlists[i].id) {
      throw `The ID is taken`
    }
  }
  let arry = []
  player.playlists.push({
    id: id,
    name: name,
    songs: arry.push([newSongs]),
  })
}

function playPlaylist(id) {
  for (let i = 0; i <= player.playlists.length; i++) {
    if (player.playlists[i].id !== id) {
      throw 'non-existent ID'
    }
    if (player.playlists[i].id === id) {
    }
    return player.playlists[i].songs
  }
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
