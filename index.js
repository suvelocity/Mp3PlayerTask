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
      console.log("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + timeConventor(song.duration) + ".");
  }
}
// this help function gets time in seconds and return it by minutes in this style => min:sec (for example, 04:19)
function timeConventor(duration){
  if (duration/60 < 10){
    if (duration%60 < 10){
      return "0"+Math.floor(duration/60)+ ":0" + duration%60;
    }else{
      return "0"+Math.floor(duration/60)+ ":" + duration%60;
    }
  }else if (duration%60 < 10){
    return Math.floor(duration/60)+ ":0" + duration%60;
  }else{
    return Math.floor(duration/60)+ ":" + duration%60;
  }

}
// this is help function that return boolean value of the exist of id in list (can be songs or playlists)
function isIdExist(List , id){
  for(let i = 0; i < List.length; i++){
    if (List[i].id === id){
      return true;
    }
  }
  return false;
}
//this is help function that return song from the player object by given Id
function getSongFromId(songs , id){
  for(let i = 0; i < songs.length; i++){
    if (songs[i].id === id){
      return songs[i];
    }
  }
}
// Main Task
//this function get id of song and print it to the console if the song id exist. 
//if id doesnt exist the function throws error
function playSong(id) {
  if(isIdExist(player.songs , id)){
    player.playSong(getSongFromId(player.songs , id));
  }else{
    throw "non exist Id";
  } 
}
// this is help function that get id and remove the song from the player songs list
function removeSongFromPlayerById(songs , id){
  if (songs.length === 0){
    return [];
  }else if(songs[0].id === id){
    return removeSongFromPlayerById(songs.slice(1) , id);
  }else{
    return [songs[0]].concat(removeSongFromPlayerById(songs.slice(1) , id));
  }
} 
// this is help function that get id and list of playlists and return if song by the given id is exist in the playlists
function isExistOnPlaylist(playlists, id){
  for (let i = 0 ; i < playlists.length ; i++ ){
    for (let j = 0 ; j < playlists[i].songs.length ;j++){
      if (playlists[i].songs[j] === id){
        return true;
      }
    }
  }
  return false;
}
//this is help function that get one playlist and id and remove the id if exist
function removeFromPlaylistSongsList(songs , id){
  if(songs.length === 0){
    return [];
  }else if (songs[0] === id){
    return removeFromPlaylistSongsList(songs.slice(1) , id);
  }else{
    return [songs[0]].concat(removeFromPlaylistSongsList(songs.slice(1) , id));
  }
} 
// Main Task
//this function gets id of song and remove  it from player songs and from the player playlists
//if id doesnt exist the function throws error
function removeSong(id) {
  if (isIdExist(player.songs , id)){
    player.songs=removeSongFromPlayerById(player.songs , id)
    if (isExistOnPlaylist(player.playlists, id)){
      for (let i = 0 ; i < player.playlists.length ; i++){
        player.playlists[i].songs=removeFromPlaylistSongsList(player.playlists[i].songs, id);
      }
    }
  }else{
    throw "non exist Id";
  }
}
//this function return id number based on the player songs/playlists list.
function numberForId(playerList){
  let arr=[];
  for (let i = 0 ; i < playerList.length ; i++){
    arr.push(playerList[i].id);
  }
  if (arr.length === 0){
    return 1;
  }
  arr=arr.sort(function (a, b) { return a - b;  });
  let id = 0;
  for (let i = 0 ;  i < arr.length ; i++){
    if(arr[i] > (i+1)){
      return i+1;
    }
  }
  id = arr.length+1;
  return id;
}
//this functions get time by min:sec and return duration by sec
function timeConventorToSeconds(time){
  let arr = time.split('');
  let min = (parseInt(arr[0])*10)+parseInt(arr[1]);
  let sec = parseInt(arr[3]+arr[4]);
  return (min * 60) + sec;
}
// Main Task
//this function gets arguments of song and add it to player songs list 
//if id exist on player songs list the function throws error
function addSong(title, album, artist, duration, id) {
  let newId=id;
  if (isIdExist(player.songs , id)){
    throw "this id is taken";
  }else if(id=== undefined){
    newId = numberForId(player.songs);
  }
  player.songs.push(new Object());
  player.songs[player.songs.length-1].id= newId;
  player.songs[player.songs.length-1].duration= timeConventorToSeconds(duration);
  player.songs[player.songs.length-1].title= title;
  player.songs[player.songs.length-1].artist= artist;
  player.songs[player.songs.length-1].album= album;
  return newId;
}

//this function remove playlist/song from list of songs/playlists based on the id that given and based on that the id exist.
function removeHelp(List,id){
  if (List[0].id === id){
    return List.slice(1)
  }else{
    return [List[0]].concat(removeHelp(List.slice(1),id));
  }
}
//Main Task
//this function gets id of playlist and remove the playlist from the player playlists list
//if id doesnt exist the function throws an error
function removePlaylist(id) {
  if (isIdExist(player.playlists, id)){
    player.playlists  = removeHelp(player.playlists,id);
  }else{
    throw "non exist Id";
  }
}
//Main Task
//this function gets id of new playlist and name and creates new playlist on the playlists list of the player
//if id is taken the function throws an error
function createPlaylist(name, id) {
  let newId=id;
  if (isIdExist(player.playlists , id)){
    throw "this id is taken";
  }else if(id=== undefined){
    newId = numberForId(player.playlists);
  }
  player.playlists.push(new Object());
  player.playlists[player.playlists.length-1].id= newId;
  player.playlists[player.playlists.length-1].name= name;
  player.playlists[player.playlists.length-1].songs= [];
  return newId;
}
// this is help function that get list of properties and return the item with the id the function gets as argument.
function returnPropItem(playerList,id){
  if (playerList.length === 0){
    throw "non exist id";
  }else if (playerList[0].id === id){
    return playerList[0];
  }else{
    return returnPropItem(playerList.slice(1),id);
  }
}
//Main Task
//this function gets id of playlist and print to the console every song that exist in the playlist
//if id doesnt exist the function throws an error
function playPlaylist(id) {
  if (!isIdExist(player.playlists , id)){
    throw "non exist id";
  }else{
    let playlist = returnPropItem(player.playlists,id);
    for (let i = 0 ; i < playlist.songs.length ; i++ ){
      playSong(playlist.songs[i]);
    }
  }
}
// this is help function that gets List of songs id and return it without the id of the argument
function removeHelpForSongsOnPlaylists(List,id){
  if (List[0] === id){
    return List.slice(1)
  }else{
    return [List[0]].concat(removeHelpForSongsOnPlaylists(List.slice(1),id));
  }
}
// this is help function that return boolean value of the exist of id in list (only on List of songs inside playlist- list of numbers)
function isIdExistInsidePlaylist(List , id){
  for(let i = 0; i < List.length; i++){
    if (List[i] === id){
      return true;
    }
  }
  return false;
}
//Main Task
//this function gets id of playlist and edit it based on the argument of the songId that he gets.
//if id of song or playlist is non exist the function throws an error
function editPlaylist(playlistId, songId) {
  if (!isIdExist(player.songs , songId)){
    throw "non exist id for song";
  }else if (!isIdExist(player.playlists , playlistId)){
  throw "non exist id for playlist";
  }else if(!isIdExistInsidePlaylist(returnPropItem(player.playlists, playlistId).songs , songId)){
  for (let i = 0 ; i < player.playlists.length ; i++){
    if (player.playlists[i].id === playlistId){
      player.playlists[i].songs.push(songId);
    }  
  }
  }else{
    for (let i = 0 ; i < player.playlists.length ; i++){
      if (player.playlists[i].id === playlistId){
        player.playlists[i].songs = removeHelpForSongsOnPlaylists(player.playlists[i].songs,songId);
        if(player.playlists[i].songs.length === 0){
         removePlaylist(playlistId);
        }
      }
    }
  }  
}
//Main Task
//this function gets id of playlist and return the duration of all the songs that exist in the playlist.
//if id playlist is non exist the function throws an error
function playlistDuration(id) {
  let duration = 0 
  if (!isIdExist(player.playlists , id)){
    throw "non exist id for playlist";
  }else{
    for (let i = 0 ; i < returnPropItem(player.playlists,id).songs.length ; i++){
      duration += returnPropItem(player.songs,returnPropItem(player.playlists,id).songs[i]).duration;
    }
  }
  return duration;
}
// this function gets item (song/playlist) and query and return if the query is exist inside one of the properties of the item.(no matter to lowercase or uppercase)
function serchForQuery(item , query){
  let lowerQuery=query.toLowerCase();
  if(item.hasOwnProperty('title')){
    if(item.title.toLowerCase().indexOf(lowerQuery) > -1 || item.album.toLowerCase().indexOf(lowerQuery) > -1 || item.artist.toLowerCase().indexOf(lowerQuery) > -1){
      return true;
    }else{
      return false
    }
  }else{
    return item.name.toLowerCase().indexOf(lowerQuery) > -1;
  }
}
//Main Task
//this function gets string and return an object that has all the playlists that has the string inside the name of the playlists and also songs(title)
//this function sort the playlists and songs alphanumerically
function searchByQuery(query) {
  let arrSongs=[];
  let arrPlaylists=[];
  for (let i = 0 ; i < player.songs.length ; i++){
    if(serchForQuery(player.songs[i] , query)){
      arrSongs.push(player.songs[i])
    }
  }
  for (let i = 0 ; i < player.playlists.length ; i++){
    if(serchForQuery(player.playlists[i] , query)){
      arrPlaylists.push(player.playlists[i])
    }
  }
  let results = new Object();
  results.playlists=arrPlaylists.sort((a,b)=> {if(a['name'] < b['name']) return -1});; //this is sort the playlists array based on the name of the playlist
  results.songs = arrSongs.sort((a,b)=> {if(a['title'] < b['title']) return -1});//this is sort the songs array based on the title of the song
  return results;
}
//Main Task
//this function gets time (min:sec) and return the item(song or playlist) that has the closest duration
function searchByDuration(duration) {
  let closest= player.songs[0];
  for (let i = 1 ; i < player.songs.length-1 ; i++){
    if(Math.abs(closest.duration-timeConventorToSeconds(duration)) > Math.abs(player.songs[i].duration-timeConventorToSeconds(duration))){
      closest= player.songs[i];
    }
  }
  if(player.playlists.length != 0){
    var closestPlaylist=player.playlists[0];
    for (let i = 1; i < player.playlists.length-1 ; i++){
      if(Math.abs(playlistDuration(closestPlaylist.id)-timeConventorToSeconds(duration)) > Math.abs(playlistDuration(player.playlists[i].id)-timeConventorToSeconds(duration))){
        closestPlaylist= player.playlists[i];
      }
    }
  }
  if(Math.abs(closest.duration-timeConventorToSeconds(duration)) > Math.abs(playlistDuration(closestPlaylist.id)-timeConventorToSeconds(duration))){
    return closestPlaylist;
  }else{
    return closest;
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
