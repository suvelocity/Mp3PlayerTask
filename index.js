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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${secToMmSs(song.duration)}.`)
  },
}

function playSong(id) {

  return player.playSong(songById(id));
}

function removeSong(id) {
  let indexSong = player.songs.indexOf(songById(id))
  player.songs.splice(indexSong, 1);

  for (let i = 0; i < player.playlists.length; i++)
    player.playlists[i].songs.splice(i, 1);
}

function addSong(title, album, artist, duration, id) {
  if (checkIdAvilable(id) == false) throw ("This ID is in use!");
  if (id == undefined) id = generateId(id);

  player.songs.push({
    title: title,
    album: album,
    artist: artist,
    duration: mmToSec(duration),
    id: id
  })
  return id
}


function removePlaylist(id) {
  let indexPl = player.playlists.indexOf(getIndexPl(id))
  player.playlists.splice(indexPl, 1)
}

function createPlaylist(name, id) {
  if (checkIdAvilablePl(id) == false) throw ("This ID is in use!");
  if (id == undefined) id = generateId(id);
  player.playlists.push({
    id: id,
    name: name,
    songs: []
  })
  return id;
}



function playPlaylist(id) {
  for (let i of player.playlists) {
    if (i.id === id) {
      for (let j of i.songs) {
        for (let i in player.songs) {
          if (player.songs[i].id === j) {
            player.playSong(player.songs[i])
          }
        }
      }
      return
    }
    else {
      throw new Error('There is a problem');
    }
  }
}

function editPlaylist(playlistId, songId) {
  songById(songId);
  let playlist = getIndexPl(playlistId);
  let index = player.playlists.indexOf(playlist);
  for (let i = 0; i < playlist.songs.length; i++) {
    if (playlist.songs[i] === songId) {
      player.playlists[index].songs.splice(i, 1)
      if (player.playlists[index].songs.length === 0) {
        removePlaylist(playlistId);
      }
    } else {
      player.playlists[index].songs.push(songId);
    }
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


// help functions 

function songById(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id == id) {
      return player.songs[i]
    }
  }
  throw new Error("There is no song with such an Id");
}


function getIndexPl(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id == id)
      return player.playlists[i];
  }
  throw ("No playlist with that ID!");

}




function secToMmSs(duration) {
  let min = Math.floor(duration / 60);
  let sec = duration - (min * 60);

  if (min < 10) {
    min = "0" + String(min);
  }
  if (sec < 10) {
    sec = "0" + String(sec);
  }

  return min + ':' + sec
}


function checkIdAvilable(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id != id) {
      return true;
    }
    return false;
  }

}

function checkIdAvilablePl(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id != id) {
      return true;
    }
    return false;
  }
}
function mmToSec(duration) {
  let get = duration.split(':');
  let min = parseInt(get[0]) * 60;
  let sec = parseInt(get[1]);
  let totalSec = min + sec;
  return totalSec;
}

function generateId() {
  id = Math.floor(Math.random() * 1000) + 1;
  for (let i = 0; i < player.songs.length; i++) {
    if (id !== player.songs[i].id) {
      return id;
    }
  }
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
