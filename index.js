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
    console.log(/* your code here */)
  },
}


function getSongFromID(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i].id === id) {
      return { title, album, artist, duration, } = player.songs[i], arrId = i;
    }
  }
  throw 'Please enter valid id';
}
function durationToMMSS(duration) {
  let mm = Math.floor(duration / 60);
  let dd = duration % 60;
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${mm}:${dd}`
}
function playSong(id) {
  getSongFromID(id);
  console.log(`Playing ${title} from ${album} by ${artist} | ${durationToMMSS(duration)}.`)
}

function removeSong(id) {
  getSongFromID(id);
  player.songs.splice(arrId, 1);
  for (let key of player.playlists) {
    let indexInList = key.songs.indexOf(id);
    if (indexInList >= 0) {
     key.songs.splice(indexInList,1);
    }
  }
}
function getBiggestID(){
  let biggestID = 0;
  for(let key of player.songs){
    if(key.id>biggestID){
      biggestID=key.id;
    }
  }
  return biggestID;
}

function addSong(title, album, artist, duration, id) {
if(!id){
  id = getBiggestID()+1;
}
  let newArr = {
  'id':id,
  'title':title,
  'album':album,
  'artist':artist,
  'duration':duration
};
player.songs.push(newArr);
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
