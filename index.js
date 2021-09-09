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
  if (findIdPlaylist(id) === false) {
    throw 'non-existent ID';
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      delete player.playlists[i];
      player.playlists.length--;
    }
  }
}

function createPlaylist(name, id = 20) {
  if (findIdPlaylist(id) === true) {
    throw 'ID is already taken';
  }
  let newPlayList = {
    id: id,
    name: name,
    songs: [],
  }
  player.playlists.push(newPlayList);
  return id;
}

function playPlaylist(id) {
  if (findIdPlaylist(id) === false) {
    throw 'non-existent ID';
  }
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        playSong(player.playlists[i].songs[j])
      }
    }
  }
}

function editPlaylist(playlistId, songId) {
  if (findIdPlaylist(playlistId) === false) {
    throw 'non-existent ID';
  }
  if (findID(songId) === false) {
    throw 'non-existent ID';
  }
  for (var j = 0; j < player.playlists.length; j++) {
    if (player.playlists[j].id === playlistId) {
      for (var i = 0; i < player.playlists[j].songs.length; i++) {
        if (player.playlists[j].songs.length === 1 && player.playlists[j].songs[0] === songId) {
          player.playlists.splice(j, 1);
          break;
        }
        else
          if (player.playlists[j].songs[i] === songId) {
            player.playlists[j].songs.splice(i, 1);
            break;
          }
          else
            if (i === player.playlists[j].songs.length - 2) {
              player.playlists[j].songs.push(songId);
            }

      }



    }
  }
}

function playlistDuration(id) {
  let sum = 0;
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        for (let k = 0; k < player.songs.length; k++) {
          if (player.playlists[i].songs[j] === player.songs[k].id) {
            sum += player.songs[k].duration;
          }
        }

      }
    } return sum;
  }
}

function searchByQuery(query) {
  const player1 = {
    songs:[],
    playlists:[],
  }
  ;
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].title.toLowerCase().includes(query.toLowerCase()) || player.songs[i].artist.toLowerCase().includes(query.toLowerCase()) || player.songs[i].album.toLowerCase().includes(query.toLowerCase())) {
      player1.songs.push(player.songs[i]);
    }
  }
  for (let j = 0; j < player.playlists.length; j++) {
    if (player.playlists[j].name.toLowerCase().includes(query.toLowerCase())) {
      player1.playlists.push(player.playlists[j]);

    }
  }
  player1.songs.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  player1.playlists.sort((c,d) => (c.name > d.name) ? 1 : ((c.name > d.name) ? -1 : 0));
  return player1;
  
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
function findIdPlaylist(id) {
  for (let newPlay of player.playlists) {
    if (newPlay.id === id)
      return true
  }
  return false
}
function findEmpty(array, x) {
  for (let z = 0; z < array.length; z++) {
    if (array[z] === "")
      array[z] === x;
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

