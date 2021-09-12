const player = { //object of the 1875 mp3 player clone
  songs: [
    {
      id: 1,
      title: 'Boys and Girls',
      album: 'CTV3',
      artist: 'Jaden',
      duration: 223
    },
    {
      id: 2,
      title: 'Dejanbem',
      album: 'Haitian Boy Kodak',
      artist: 'Kodak Black',
      duration: 214
    },
    {
      id: 7,
      title: 'Versatile 3',
      album: 'Before The Album',
      artist: 'Kodak Black',
      duration: 334
    },
    {
      id: 3,
      title: 'Gnarly',
      album: 'Dying To Live',
      artist: 'Kodak Black feat. Lil Pump',
      duration: 214
    },
    {
      id: 4,
      title: 'Freaky Girl',
      album: 'I AM YOU',
      artist: 'YNW Melly',
      duration: 215
    },
    {
      id: 5,
      title: 'Betrayal',
      album: 'Trip At Knight',
      artist: 'Trippie Redd feat. Drake',
      duration: 151
    }
  ],
  playlists: [
    { id: 1, name: 'Hip-Hop', songs: [1, 3, 4] },
    { id: 5, name: 'Rap', songs: [2, 7, 5] },
  ],
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${sstomm(song.duration)}.`)
  }
}

function playSong(id) { //play a given song by its id
  if(getSongIdIndex(id) === undefined) throw("song id not found in list");
  player.playSong(player["songs"][getSongIdIndex(id)]); //uses the playSong method to play a specific song on the mp3!
}

function getSongIdIndex(id){  //find the song index from the list (and returns it if exist!- wehn running i assigned before running it)
  for(let i=0; i<player["songs"].length; i++)
  {
   if(player["songs"][i]["id"] === id) return i;
  }
} // if i use throw in this function when i use it in other places it stops the running of both used and using functions cuz throw just stop the wholeee operation of the code cuz it realises an error... so better assign it with an if statement before each run of this function in other functions

function getPlaylistIdIndex(id){  //find the playlist index from the list (and returns it if exist!- wehn running i assigned before running it)
for(let i=0; i<player["playlists"].length; i++)
{
 if(player["playlists"][i]["id"] === id) return i;
}
}

function removeSong(id) { //delete a song from the mp3!
  if(getSongIdIndex(id) === undefined) throw("song id not found in list");
  player.songs.splice(getSongIdIndex(id),1); //removed song from songs list. if id exists.
  for(let i=0; i<player.playlists.length;i++) //go over the playlists.
  {
    if(player.playlists[i].songs.includes(id))  player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id), 1); // removes the id from the playlist, if exists.
  }
}

function addSong(title, album, artist, duration, id) {
  // your code here
}

function mmtoss(minutes) // translate mm:ss to ss 
{
 const mmtoss = minutes.split(':'); //seperates between minutes and seconds and puts it inside a new array.
 return parseInt(mmtoss[0]) * 60 + parseInt(mmtoss[1]); //converts to seconds. and adds up.
}

function freeSongID(){ // func return the free id which not yet registered to any song in the list.
  let free=1;
  
  while(typeof(getSongIdIndex(free)) === 'number'){
    free++;
  } return free;
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

function sstomm(seconds){ //converts seconds durationg to mm:ss format!
  console.log(seconds)
  return (Math.floor(seconds/60) + ":"  + (seconds%60)); //check how many minutes "enter" in it and rounding it to the max tries which it has no remainder. then adds up the remainder of the seconds left.
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
