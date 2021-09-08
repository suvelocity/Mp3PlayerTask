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
      id: 9,
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
    return `Playing ${song.title} from ${song.album} by ${song.artist} | ${convertTime(song.duration)}.`;
  },
}

function playSong(id) {
  if (findID(id) === false) {
    throw 'non-existent ID';
  }
  else {
    song = {};
    for (let obj of player.songs) {
      if (obj.id === id) {
        song = obj;
        break;
      }
    }
    console.log(player.playSong(song))
  }
}

function removeSong(id) {
  if (findID(id) === false) {
    throw 'non-existent ID';
  }
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      player.songs.splice(i, 1)
      break;
    }

  }
  for (let k = 0; k < player.playlists.length; k++) {
    for (let j = 0; j < player.playlists[k].songs.length; j++) {
      if (player.playlists[k].songs[j] === id)
        player.playlists[k].songs.splice(j, 1);
      break;
    }
  }
}



function addSong(title, album, artist, duration, id = 15) {
  if (findID(id) === true) {
    throw 'ID is already taken';
  }
  let time = convertSeconds(duration);

  let song = {
    id: id,
    title: title,
    album: album,
    artist: artist,
    duration: time,
  }


  player.songs.push(song);
  return id;

}

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
function convertTime(duration) {
  let seconds = duration % 60;
  let minutes = (duration - seconds) / 60;
  minutes = `0${minutes}`;
  return `${minutes}:${seconds}`;
}

function findID(id) {
  for (let song of player.songs) {
    if (song.id === id)
      return true;
  }
  return false;

}
function convertSeconds(duration) {
  let array = duration.split(":");
  let minutes = parseInt(array[0]);
  let seconds = parseInt(array[1]);
  return minutes * 60 + seconds;


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