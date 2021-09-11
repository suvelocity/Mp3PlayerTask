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

//Errors:
function errorPlaylistExists(id){  //A function that throws an error if the ID already exists in the Player object
  if (getListOfIdPlaylist().includes(id) === true) {
    throw new Error("The id already exists");
  }
}

function errorSongExists(id) { //A function that throws an error if the ID already exists in the Player object
  if (getListOfIdSongs().includes(id) === true) {
    throw new Error("The id already exists");
  }
}

function playlistIdDoesNotExist(id) { //A function that throws an error if the ID is not found in the array
  if (getListOfIdPlaylist().includes(id) === false) {
    throw new Error("There is no playlist with this ID in the player");
  }
}

function songIdDoesNotExist(id) { //A function that throws an error if the ID is not found in the array
  if (getListOfIdSongs().includes(id) === false) {
    throw new Error("There is no song with this ID in the player");
  }
}

//Second-to-minute conversions and vice versa:
function mmssToSeconds(mmss) { //Convert MM:SS string to seconds
  let splitMmSs = mmss.split(':')
  let seconds = (+splitMmSs[0]) * 60 + (+splitMmSs[1])
  return seconds
}

function convertDuration(num) { //Converts seconds to MM:SS format
  let mins = Math.floor(num / 60)
  let sec = num % 60
  return mins.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0')
} 

//Functions that receive an ID and return the relevant array
function getSongById(id) { //Gets an ID and provides the details about the relevant song
  for (let key of player.songs) {
    if (key.id === id) {
      return key
    }
  }
}

function getPlaylistById(id) { //Gets an ID and provides the details about the relevant playlist
  for (let key of player.playlists) {
    if (key.id === id) {
      return key
    }
  }
}

//Functions that create an array of ID:
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

//A function that generates an ID if not provided by the user:
function generateId(arr) {  //If the user does not give Id, the function produces independently.
  newArrId = arr.slice()
  newArrId.sort((a,b) => a-b)
  return newArrId[newArrId.length - 1] + 1
}

//The basic functions that affect MP3:
function playSong(id) {
  errorSongExists();
  player.playSong(getSongById(id))
}

function removeSong(id) { //Deletes song from songs and playlists
  const removeIndexSongs = player.songs.findIndex( item => item.id === id );
  songIdDoesNotExist(id);
  player.songs.splice( removeIndexSongs, 1 ); //remove from songs 
  for (let i of player.playlists) {
    let arr = i.songs;
    if (arr.includes(id)){
      i.songs.splice(arr.indexOf(id), 1); //remove from playlists
    }
  }
}

function addSong(title, album, artist, duration, id = generateId(getListOfIdSongs())) { //Adds an object-shaped song to an array of songs
  let dueationToSeconds = mmssToSeconds(duration)
  let newSong = {id: id, title: title, album: album, artist: artist,duration: dueationToSeconds} //Creates a new object
  errorSongExists(id)
  player.songs.push(newSong);
  return newSong.id;
}

function removePlaylist(id) { //Gets a playlist ID and deletes it from the playlist array
  const removeIndex = player.playlists.findIndex( item => item.id === id );
  playlistIdDoesNotExist(id);
  player.playlists.splice( removeIndex, 1 );
}

function createPlaylist(name, id = generateId(getListOfIdPlaylist())) { //A function that creates a new playlist
  let newPlaylist = {id: id, name: name, songs: []}
  errorPlaylistExists(id)
  player.playlists.push(newPlaylist);
  return newPlaylist.id
}

function playPlaylist(id) {  //A function that receives a playlist Id and plays all the songs in it
  playlistIdDoesNotExist(id);
  for (let playlist of player.playlists){
      if (playlist["id"] === id) {
        for (let song of playlist["songs"]) {
          playSong(song)
        }
    }
  }
}

function editPlaylist(playlistId, songId) {
  playlistIdDoesNotExist(playlistId);
  songIdDoesNotExist(songId);
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
  
function playlistDuration(id) {  // A function that returns the duration of all the songs in the playlist it receives
  playlistIdDoesNotExist(id);
  count = 0 
  for (let song of player.playlists) {
    if (song["id"] === id) {
      for(let i of song["songs"])
        count += getSongById(i)["duration"]
    }
  }
  return count
}

function searchByQuery(query) {  //A function that is like (ctrl + F). Gets a string and returns all the songs or playlists that contain the same string
  let songs = []
  let playlists = []
  for (let item of player.songs) {
    if(item.title.toLowerCase().includes(query.toLowerCase())) songs.push(item);
    else if(item.artist.toLowerCase().includes(query.toLowerCase())) songs.push(item);
    else if(item.album.toLowerCase().includes(query.toLowerCase())) songs.push(item);
  }
  for (let item of player.playlists){
    if(item.name.toLowerCase().includes(query.toLowerCase())) playlists.push(item);
  }
  //Sort the arrays in alphabetical order:
  songs.sort((a,b) => {
      return (a.title > b.title) ? 1 : -1;
  })
  playlists.sort((a,b) => {
    return (a.name > b.name) ? 1 : -1;
  })

  return {songs,playlists};
}

function searchByDuration(duration) { //A function that takes the duration of the user and returns the song or playlist whose duration is closest to the duration entered
  let seconds = mmssToSeconds(duration)
  let arrayOfDuration = []
  //Creates an array of arrays that each has its own duration, id and whether it is a playlist or a song
  for(let songsInner of player.songs) {
    arrayOfDuration.push([songsInner["duration"],songsInner["id"],"s"])
  }
  for (let playlistInner of player.playlists) {
    arrayOfDuration.push(([playlistDuration(playlistInner["id"]),playlistInner.id,"p"]))
  }
  
  //Create a const that contains the absolute value of the subtraction between the length of the first song and the length entered by the user
  //and the ID,and if it "s"/"p"
  const numId = [Math.abs(arrayOfDuration[0][0] - seconds), arrayOfDuration[0][1],""];
  /*
  Run for loop on the new array we created above,
  and if the absolute value of the duration subtraction is smaller
  it means that the length of the song is closer to the value entered by the user
  and replaces the numId values
  ​​to the values ​​of the array on which it is located
  */
  for (let item of arrayOfDuration) {
    if(Math.abs(item[0]-seconds) < numId[0]){
      numId[0] = Math.abs(item[0]-seconds);
      numId[1] = item[1];
      numId[2] = item[2];
    }
  }
  //Checks if it is a playlist or a song(index 2), and returns the song using ID (index 1)
  if (numId[2] === 'p') {
    return getPlaylistById(numId[1])
  }
  return getSongById(numId[1])
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
