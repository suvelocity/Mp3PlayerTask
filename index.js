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
    return (`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationConvertor(song.duration)}.`);
  }
}

//Duration convertor (from seconds to mm:ss)
function durationConvertor(duration){
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  if (seconds < 10){
    seconds = "0" + seconds;
  }
  if (minutes < 10){
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}

//Duration reverse convertor (from mm:ss to seconds)
function reverseDurationConvertor(duration){
  duration = duration.split(":");
  let minutes = parseInt(duration[0]) * 60;
  let seconds = parseInt(duration[1]);
  return minutes + seconds;
}

//Returns true if id exists and false if not
function idCheck(id){
  for(let song of player.songs){
      if(song.id == id){
        return true;
      }
  }
  return false;
}


function playSong(id) {
  if(!idCheck(id)) throw new Error("Invalid ID");
  for(let song of player.songs){
    if(song.id === id){
      console.log(player.playSong(song));
    }
  }
}

//Returns an index of a song in songs by id
function IndexOfSong(id) {
  for(let song of player.songs){
   if(song.id == id){ 
     return player.songs.indexOf(song);
     }
   }
 }

 //Deleting the specific song from playlists
function DeleteInPlayLists(id) {
  for(let playlistSongs of player.playlists){
    for(let i = 0; i < playlistSongs.songs.length; i++){
      if(playlistSongs.songs[i] == id){
        playlistSongs.songs.splice(i, 1);
      }
    }
  }
 };

function removeSong(id) {
  if(!idCheck(id)) throw new Error("Invalid ID");
  player.songs.splice(IndexOfSong(id), 1);
  DeleteInPlayLists(id);
}

//Random ID generator between 1-100
function randomId(){
  return Math.floor(Math.random() * 101);
}


//The regular method

function addSong(title, album, artist, duration, id = randomId()) {
  if(idCheck(id)){
    throw new Error("ID is taken");
  }
  while(idCheck(id)){
    id = randomId();
  }
  player.songs.push({
      id: id,
      title: title,
      album: album,
      artist: artist,
      duration: reverseDurationConvertor(duration)
    });
    return id;
}

//Constructor method
/*
//Contructor function that creates a song object 
function Song(title, album, artist, duration, id){
  constructor: Object,
  this.id = id;
  this.title = title;
  this.album = album;
  this.artist = artist;
  this.duration = reverseDurationConvertor(duration);
}

function addSong(title, album, artist, duration, id = randomId()){
    if(idCheck(id)){
    throw new Error("ID is taken")
  }
  while(idCheck(id)){
    id = randomId();
  }
    player.songs.push(new Song(id, title, album, artist, duration));
    return id;
  }
*/

//Check id in playlists returns the playlist if exists and false if not
function checkPlaylistId(id){
  for(let playlist of player.playlists){
    if(playlist.id == id){
      return playlist;
    }
  }
  return false;
}

function removePlaylist(id) {
  let playlist = checkPlaylistId(id);
  if(playlist == false){
    throw new Error("ID non existent in playlist");
  }else{ 
      player.playlists.splice(player.playlists.indexOf(playlist), 1); 
  }
}

//Gets ID and check if valid, if valid returns playlists id, else return -1
function playlistId(id){
  for(let playlist of player.playlists){
    if(playlist.id == id){
      return -1;
    }
  }
  return id;
}

function createPlaylist(name, id = randomId()) {
  if(playlistId(id) < 0){
    throw new Error("Invalid ID");
  }
  player.playlists.push({
    id: id,
    name: name,
    songs: []
  });
  return id;
}

function playPlaylist(id) {
  let playlist = checkPlaylistId(id);
  if(playlist == false){
    throw new Error("ID non existent in playlists");
  }else{ 
    for(let i = 0; i < playlist.songs.length; i++)
      playSong(playlist.songs[i]); 
  }
}

//checks if the song exists in the list
function songCheck(list, song){
  for(let i = 0; i < list.length; i++){
    if(list[i] == song){
      return true;
    }
  }
  return false;
}

//Adds a song to a song list
function songPush(list, song){
  list.push(song);
  return list;
}


function editPlaylist(playlistId, songId) {
  //check validity of song in player
  if(!idCheck(songId)){
    throw new Error("Song ID non existent in player");
  }
  //checks the validity of the playlist ID
  let playlist = checkPlaylistId(playlistId);
  if(playlist == false){
    throw new Error("Playlist ID non existent in playlists");

    //checks if the song exists in the songs list
  }else if(songCheck(playlist.songs, songId) == true){

    //if song exists it removes the song from the songs list
    DeleteInPlayLists(songId);

    //if songs list is now empty the function deletes the playlist
    if(playlist.songs.length == 0){
      removePlaylist(playlistId);
    }

    //if song does not exists it pushes the song to the songs list
  }else{
    playlist.songs = songPush(playlist.songs, songId);
  }
}

//returns the duration of a song
function getDuration(id){
  if(!idCheck(id)){
    throw new Error("This song does not exists")
  }
  for(let song of player.songs){
    if(song.id == id){
      return song.duration;
    }
  }
}

function playlistDuration(id) {
  let playlist = checkPlaylistId(id);
  if(playlist == false){
    throw new Error("Playlist ID non existent in playlists");
  }
  let durations = 0;
  for(let i = 0; i < playlist.songs.length; i++){
    durations += getDuration(playlist.songs[i]);
  }
  return durations;
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