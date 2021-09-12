/*
this function gets one parameter seconds
and return a string value of the minutes
in 'mm:ss' format.
*/
function toMinutes(sec) {
  const minFormat = ["mm", "ss"];
  minFormat[1] = sec % 60 < 10 ? "0" + sec % 60: sec % 60;
  minFormat[0] = sec / 60 < 10 ? "0" + Math.floor(sec / 60): Math.floor(sec / 60);
  return minFormat.join(':');
}

function toSeconds(duration) {
  const arr = duration.split(':');
  return parseInt(arr[0]) * 60 + parseInt(arr[1]);
}

function removeSongFromPlayer(id) {
  const songIndex = player.songs.indexOf(getSong(id));
  player.songs.splice(songIndex, 1);
}

function removeSongFromPlaylists(id) {
  for(let playlist of player.playlists) {
    const songIndex = playlist.songs.indexOf(id);
    playlist.songs.splice(songIndex, 1);
  }
}

/*
this function checks if an id exists in the objects array
*/
function isIdExist(arr, id) {
  return arr.find(x => x.id === id) !== undefined;
}

/*
this function return the max id of an objects array
*/
function getMaxId(arr) {
  let max = 0;
  for (let obj of arr) {
    if(obj.id > max) max = obj.id;
  }
  return max;
}

function getPlaylist(id) {
  const playlist = player.playlists.find(x => x.id === id);
  return playlist;
}

function getSong(id) {
  const song = player.songs.find(x => x.id === id);
  return song;
}

function existError() {
  throw 'this id already exist!';
}
function notExistError() {
  throw 'this id does not exist!';
}

/*
recursion function that sums the duration of a playlist.
*/
function sumDuration(arr) {
  if(arr.length === 0) return 0;
  return getSong(arr.pop()).duration + sumDuration(arr.slice(0, arr.length));
}

/*
this function gets a query, an array of objects, 
and array of keys and returns an array of
objects if the query includes in the keys
*/
function queryArr(query, objArr, keyArr) {
  const queryArr = [];
  for(let obj of objArr) {
    for(let i = 0; i < keyArr.length; i++) {
      if(obj[keyArr[i]].includes(query)) {
        queryArr.push(obj);
        i = keyArr.length;
      }
    }
  }
  return queryArr;
}

/*
this function gets an array of objects and sort
it alphanumerically by the property of the objects
*/
function sortObjectsArray(arr, property) {
  const sortedObjects = [];
  for (let obj of arr) {
    sortedObjects.push(obj);
  }
  sortedObjects.sort((a, b) => {if(a[property] < b[property]) return -1;});
  return sortedObjects;
}

/*
this function gets an array of objects and duration 
(in seconds) and returns the object with the minimum 
difference between the durations.
*/
function minDurDifference(arr, duration) {
  let difference = null;  
  let newObj = null;
  for(let obj of arr) {
    const diff = obj.hasOwnProperty('name') ? playlistDuration(obj.id) - duration: obj.duration - duration;
    if(Math.abs(diff) < difference || !difference) {
      difference = Math.abs(diff);
      newObj = obj;
    }
  }
  return newObj;
}


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
    return `Playing ${song.title} from ${song.album} by ${song.artist} | ${toMinutes(song.duration)}.`;
  },
}

function playSong(id) {
  if(!isIdExist(player.songs, id)) notExistError();
  const song = player.songs.find(x => x.id === id);
  console.log(player.playSong(song));
}

function removeSong(id) {
  if(!isIdExist(player.songs, id)) notExistError();
  removeSongFromPlayer(id);
  removeSongFromPlaylists(id);
}

function addSong(title, album, artist, duration, id) {
  if(id === undefined) {
    id = getMaxId(player.songs) + 1; //generates auto id (max id + 1)
  } else {
    if(isIdExist(player.songs, id)) existError();
  }
  duration = toSeconds(duration);
  player.songs.push({id, title, album, artist, duration});
  return id;
}

function removePlaylist(id) {
  if(!isIdExist(player.playlists, id)) notExistError();
  for (let i in player.playlists) {
    if(player.playlists[i].id === id) player.playlists.splice(i, 1);
  }
}

function createPlaylist(name, id) {
  if(id === undefined) {
    id = getMaxId(player.playlists) + 1; //generates auto id (max id + 1)
  } else {
    if(isIdExist(player.playlists, id)) existError();
  }
  player.playlists.push({id, name, songs: []});
  return id;
}

function playPlaylist(id) {
  if(!isIdExist(player.playlists, id)) notExistError();
  const playlist = getPlaylist(id);
  for (let i = 0; i < playlist.songs.length; i++) {
    playSong(playlist.songs[i]);
  }
}

function editPlaylist(playlistId, songId) {
  if(!isIdExist(player.playlists, playlistId) || !isIdExist(player.songs, songId)) notExistError();
  const playlist = getPlaylist(playlistId);
  if(playlist.songs.indexOf(songId) >= 0) {
    playlist.songs.splice(playlist.songs.indexOf(songId), 1);
    if(playlist.songs.length === 0) removePlaylist(playlistId);
  } else {
    playlist.songs.push(songId);
  }
}

function playlistDuration(id) {
  if(!isIdExist(player.playlists, id)) notExistError();
  const playlist = getPlaylist(id);
  const secondsArr = [...playlist.songs];
  return sumDuration(secondsArr);
}

function searchByQuery(query) {
  let songs = [];
  let playlists = [];
  songs = queryArr(query, player.songs, ['title', 'album', 'artist']);
  playlists = queryArr(query, player.playlists, ['name']);
  songs = sortObjectsArray(songs, 'title');
  playlists = sortObjectsArray(playlists, 'name');
  return {songs, playlists};
}

function searchByDuration(duration) {
  duration = toSeconds(duration);
  const songObj = minDurDifference(player.songs, duration);
  const playlistObj = minDurDifference(player.playlists, duration);
  const songDur = Math.abs(songObj.duration - duration);
  const playlistDur = Math.abs(playlistDuration(playlistObj.id) - duration);
  return songDur < playlistDur ? songObj: playlistObj;
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
