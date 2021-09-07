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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration(song.duration)}.`)
  }
}

function errorPlaylist(id){
  if (getListOfIdPlaylist().includes(id) === true) {
    throw new Error("The id already exists");
  }
}

function errorId (id) {
  if (getListOfIdSongs().includes(id) === true) {
    throw new Error("The id already exists");
  }
}

function mmssToSeconds(mmss) { //Convert MM:SS string to seconds
  let splitMmSs = mmss.split(':')
  let seconds = (+splitMmSs[0]) * 60 + (+splitMmSs[1])
  return seconds
}


function getSongById(id) { //Gets an ID and provides the details about the relevant song
  for (let key of player.songs) {
    if (key.id === id) {
      return key
    }
  }
}
function convertDuration(num) { //Converts seconds to MM:SS format
  let mins = Math.floor(num / 60)
  let sec = num % 60
  return mins.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0')
} 

function playSong(id) {
  return player.playSong(getSongById(id))
}


function removeSong(id) { //Deletes song from songs and playlists
  const removeIndexSongs = player.songs.findIndex( item => item.id === id );
  if (removeIndexSongs === -1)  {
    throw new Error('id not found');
  }
  player.songs.splice( removeIndexSongs, 1 ); //remove from songs 
  for (let i of player.playlists) {
    let arr = i.songs;
    if (arr.includes(id)){
      i.songs.splice(arr.indexOf(id), 1); //remove from playlists
    }
  }
}

function getListOfIdSongs() { //Provides an array of all the IDs of the songs
  let arrayOfId = [];
  for (let i of player.songs) {
    arrayOfId.push(i["id"]);
  }
  return arrayOfId;
}
function getListOfIdPlaylist() { //Provides an array of all the IDs of the playlist
  let arrayOfId = [];
  for (let i of player.playlists) {
    arrayOfId.push(i["id"]);
  }
  return arrayOfId;
}

function generateId(arr) {  //If the user does not give Id, the function produces independently.
  newArrId = arr.slice()
  newArrId.sort((a,b) => a-b)
  return newArrId[newArrId.length - 1] + 1
}

function addSong(title, album, artist, duration, id = generateId(getListOfIdSongs())) { //Adds an object-shaped song to an array of songs
  let dueationToSeconds = mmssToSeconds(duration)
  let newSong = {id: id, title: title, album: album, artist: artist,duration: dueationToSeconds} //Creates a new object
  errorId(id)
  player.songs.push(newSong);
  return newSong.id;
}


function removePlaylist(id) { //Gets a playlist ID and deletes it from the playlist array
  const removeIndex = player.playlists.findIndex( item => item.id === id );
  if (removeIndex === -1)  {
    throw new Error('playlist not found');
  }
  player.playlists.splice( removeIndex, 1 );
}

function createPlaylist(name, id = generateId(getListOfIdPlaylist())) {
  let newPlaylist = {id: id, name: name, songs: []}
  errorPlaylist(id)
  player.playlists.push(newPlaylist);
  return newPlaylist.id
}

function playPlaylist(id) {  //chack!!!!
  for (let i of player.playlists){
      if (i["id"] === id) {
        for (let songs of i["songs"]) {
          console.log(playSong(songs))
        }
    }
  }
}


function editPlaylist(playlistId, songId) {
  if (getListOfIdPlaylist().includes(playlistId) === false) {
    throw new Error("There is no playlist with this ID in the player");
  }
  if (getListOfIdSongs().includes(songId) === false) {
    throw new Error("There is no song with this ID in the player");
  }
  for (let i of player.playlists){
    if (i["id"] === playlistId) {
        index = i["songs"].indexOf(songId)
        if (index === -1) {
          i["songs"].push(songId)
        }else if (index >= 0) {
          if (i["songs"].length === 1) {
            removePlaylist(playlistId)
          }else {
          i["songs"].splice(index,1)
          }
        }
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
