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
    { id: 5, name: 'Israeli', songs: [4, 5] }
  ],
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////My Functions////////////////////////////////////////////////////////////////////
function getBiggestSongID() {
  let biggestID = 0;
  for (let key of player.songs) {
    if (key.id > biggestID) {
      biggestID = key.id;
    }
  }
  return biggestID;
}

function getBiggestPlaylistID() {
  let biggestID = 0;
  for (let key of player.playlists) {
    if (key.id > biggestID) {
      biggestID = key.id;
    }
  }
  return biggestID;
}

function durationToMMSS(duration) {
  let mm = Math.floor(duration / 60);
  let ss = duration % 60;
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${mm}:${ss}`
}

function getPlaylistIndexFromID(playlistId) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === playlistId) {
      return playlistArrplace = i;
    }
  }
  throw 'Enter valid id';
}

function durationToSeconds(duration) {
  const checkDuration = /[^0-9:]/; //check for number and ":" only
  if (checkDuration.test(duration)) {
    throw 'Enter Valid duration';
  }
  let mm = duration[0] + duration[1];
  let ss = duration[3] + duration[4];
  return secondDuration = (+mm * 60 + +ss);
}

function getSongValuesFronId(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      return { title, album, artist, duration, } = player.songs[i], songArrIndex = i;
    }
  }
  throw 'Please enter valid id';
}

function TestArguments(title, album, artist, duration, id) {
  if (!id) {
    id = getBiggestSongID() + 1;
  }
  if (typeof (title) != 'string' || typeof (album) != 'string' || typeof (artist) != 'string' || typeof (id) != 'number' || id < 1 || id > getBiggestSongID() + 100) {
    throw 'Please Enter Valid Data'
  }
  for (let key of player.songs) {
    if (key.id === id) {
      throw 'This ID is taken, pick another ID';
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Test Functions////////////////////////////////////////////////////////
function playSong(id) {
  getSongValuesFronId(id);
  console.log(`Playing ${title} from ${album} by ${artist} | ${durationToMMSS(duration)}.`)
}

function removeSong(id) {
  getSongValuesFronId(id);
  player.songs.splice(songArrIndex, 1);
  for (let key of player.playlists) {
    let indexInList = key.songs.indexOf(id);
    if (indexInList >= 0) {
      key.songs.splice(indexInList, 1);
    }
  }
}

function addSong(title, album, artist, duration, id) {
  if (typeof (duration) === 'string') {
    durationToSeconds(duration);
    duration = secondDuration;
  }
  TestArguments(title, album, artist, duration, id);
  console.log(duration)
  player.songs.push({
    'id': id,
    'title': title,
    'album': album,
    'artist': artist,
    'duration': duration
  });
  return player;
}

function removePlaylist(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      return player.playlists.splice(i, 1);
    }
  }
  throw 'Enter valid id';
}

function createPlaylist(name, id) {
  if (!id) {
    id = getBiggestPlaylistID() + 1;
  }
  if (player.playlists.some(currentValue => currentValue.id == id)) {
    throw 'This ID is taken, pick another ID';
  }
  let newArr = {
    'id': id,
    'name': name,
    'songs': []
  };
  player.playlists.push(newArr);
  return player;
}

function playPlaylist(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i].id === id) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        playSong(player.playlists[i].songs[j]);
      }
      return;
    }
  }
  throw 'Enter valid playlist id';
}

function editPlaylist(playlistId, songId) {
  getSongValuesFronId(songId);
  getPlaylistIndexFromID(playlistId);
  indexOfSongInPlaylist = player.playlists[playlistArrplace].songs.indexOf(songId);
  if (indexOfSongInPlaylist < 0) {
    player.playlists[playlistArrplace].songs.push(songId);
  }
  else if (indexOfSongInPlaylist >= 0) {
    player.playlists[playlistArrplace].songs.splice(indexOfSongInPlaylist, 1);
    if (player.playlists[playlistArrplace].songs.length === 0) {
      removePlaylist(playlistId);
    }
  }
}

function playlistDuration(id) {
  let sum = 0;
  getPlaylistIndexFromID(id);
  for (let i = 0; i < player.playlists[playlistArrplace].songs.length; i++) {
    getSongValuesFronId(player.playlists[playlistArrplace].songs[i]);
    sum += player.songs[songArrIndex].duration;
  }
  return sum;
}

function searchByQuery(query) {
  const queryRegex = new RegExp(`${query}`, 'i');
  let resultObj = {
    playlists: [],
    songs: []
  };
  for (let i = 0; i < player.songs.length; i++) {
    for (let prop in player.songs[i]) {
      if (queryRegex.test(player.songs[i][prop])) {
        resultObj.songs.push(player.songs[i]);
        break;
      }
    }
  }
  for (let i = 0; i < player.playlists.length; i++) {
    for (let prop in player.playlists[i]) {
      if (queryRegex.test(player.playlists[i][prop])) {
        resultObj.playlists.push(player.playlists[i]);
        break;
      }
    }
  }
  resultObj.songs.sort(function (a, b) {
    let x = a.title.toLowerCase();
    let y = b.title.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })
  return resultObj;
}

function searchByDuration(duration) {
  durationToSeconds(duration)
  let closestSong, closestPlaylist;
  let savedSongDuration = Infinity;
  for (let i = 0; i < player.songs.length; i++) {
    if (Math.abs(player.songs[i].duration - secondDuration) < Math.abs(savedSongDuration - secondDuration)) {
      closestSong = player.songs[i];
      savedSongDuration = player.songs[i].duration;
    }
  }
  let savedPlaylistDuration = Infinity;
  for (let i = 0; i < player.playlists.length; i++) {
    if (Math.abs(playlistDuration(player.playlists[i].id) - secondDuration) < Math.abs(savedPlaylistDuration - secondDuration)) {
      closestPlaylist = player.playlists[i];
      savedPlaylistDuration = playlistDuration(player.playlists[i].id);
    }
  }
  if ((Math.abs(savedSongDuration - secondDuration) < Math.abs(savedPlaylistDuration - secondDuration))) {
    return closestSong;
  }
  return closestPlaylist;
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
