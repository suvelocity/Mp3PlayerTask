const { pipelinePrimaryTopicReference } = require("@babel/types");

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
     return ("Playing "+song.title+ " from " +song.album+" by "+song.artist+" | "+durationConvert(song.duration)+".")   
  },
}

function durationConvert(duration) // converts duration value to mm/ss
{
  
  if(typeof(duration)!=="number") //if duration is not a number
    {
    throw "not a suitable number"; 
    }
  else
    {
      let min = "";
    if (Math.floor(duration/60)>=10) min = `${Math.floor(duration/60)}`;
    if (Math.floor(duration/60)>=1 && Math.floor(duration/60)<10) min = `0${Math.floor(duration/60)}`;
    if (Math.floor(duration/60)==0) min = "00";
    let sec = "";
    if ((duration%60)>=10) sec = `${duration%60}`;
    if ((duration%60)>=1 && (duration%60)<10) sec = `0${duration%60}`;
    if ((duration%60)==0) sec = `00`;
    return min+":"+sec;    
    }
}

function GetsongById(id) //return song object by id
{
  let songObj= player.songs.find(x=> x["id"]===id);
  return songObj;
}
function GetSongIndexById(id) //get index of song in songs array
{
  let songIndex= player.songs.indexOf(GetsongById(id));
  return songIndex;
}
 function GetsongfromplaylistBysongId(id) //return playlist songs object by id- not used!
 {
   let songObj= player.playlists.find(x=>x["songs"].find(d=> d===id)===id);
   return songObj;
 }
 
  function FilterfromPlaylistByID(id) //filters the array from the song - not used!
  {
     let songObj= GetsongfromplaylistBysongId(id);
     let indexPlaySong=songObj["songs"].filter(x=> x!=id);
     return indexPlaySong;
  }
function playSong(id) 
{
  let songObj= GetsongById(id);
  if(songObj===undefined) // if id is not found in the player an error will be thrown
  {
    throw "Not a Valid ID"
  }
  console.log((player.playSong(songObj)));
}
function removeSong(id) {
  if(GetsongById(id)===undefined)
  {
    throw "invalid ID";
  }
  else{
    let songIndex= GetSongIndexById(id); //get index of song in songs array
    player.songs.splice(songIndex,1); // removed song from songs array
    // let songObj= GetsongfromplaylistBysongId(id);  //get object of song from playlist by id
    // let filteredPlayilst= FilterfromPlaylistByID(id); // filtered array of the songs in playlist
    // songObj["songs"]=filteredPlayilst;
    for(let i of player.playlists) //filter playlist from songs with id
      {
        for(let j=0;j< i.songs.length; j++)
        {
          if(i.songs[j]===id){
            i.songs.splice(j,1);
          }
        }
      }
    return player;
  }
}

function addSong(title, album, artist, duration, id) {

  if(id===undefined)
  { 
    id= Math.floor(Math.random()*100); //generates a random id to the song
    while(id === GetsongById(id)) // if the genrated id exists generate a new one
    {
      id= Math.floor(Math.random()*100);
    }
  if(GetsongById(id) !==undefined) //if the id already exists throw an error
  {
    throw "this is an existing ID";
  }
  }
  let newDuration =durationConvert(duration); 
  const newSong = {id,title, album ,artist, duration:newDuration}; //create new song object
  player.songs.push(newSong)
  return newSong["id"];
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
