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
    //change to the correct format and duration to mm:ss
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration(song.duration)}.`) 
  },
}

 //convert duration to mm:ss format
function convertDuration(duration)
{
  let minutes=Math.floor(duration/60);
  let seconds=duration%60;
  if(minutes<10)
    minutes="0"+minutes;
  if(seconds<10)
    seconds="0"+seconds;
  return minutes+":"+seconds;
}


function playSong(id) 
{
    var wantedSong = player.songs.find(res => res.id == id); //finds the song with the ID
    if(wantedSong===null){
      throw new Error("ID not found"); //if id not exist, throw error
    }
    player.playSong(wantedSong);
}


function removeSong(id) {
  var wantedSong = player.songs.find(res => res.id == id);
  let index = player.songs.indexOf(wantedSong); //find the index of the wanted song
  if(index ===-1){
    throw new Error("ID not found"); //if id not exist, throw error
  }
  //remove song from songs array and from playlists
  player.songs.splice(index,1); 
  player.playlists.forEach(element => {
    //save the index of the wanted song in each playlist
    let indexpl = element.songs.indexOf(id); 
    element.songs.splice(indexpl, 1); 
  });
}


function addSong(title, album, artist, duration, id) {

//create new id
if (arguments.length < 5 || id === undefined){
  var id = 1;
  player.songs.forEach(element => {
    id += element.id;
  });
}

//throw error if the given id already exist
player.songs.forEach(element => {
  if(element.id === id){
    throw new Error("the ID is taken");
  }
});

//change duration to mm:ss format
durationArr=duration.split(":");
duration=parseInt(durationArr[0])*60+parseInt(durationArr[1]);

//create new song object
var newSong = {
 id: id,
 title: title,
 album: album,
 artist: artist,
 duration: duration,
};

//adding the new song to the songs array
player.songs.push(newSong);
return id;
}


function removePlaylist(id) {
  //findind the wanted playlist with the same id and the index of it in the playlists array
  var wantedplay = player.playlists.find(res => res.id == id);
  let index = player.playlists.indexOf(wantedplay);

  //throw error if the given id is not exist
  if(index ===-1){
    throw new Error("ID not found"); 
  }

  //removing the wanted playlist from the array
  player.playlists.splice(index,1); 
}

function createPlaylist(name, id) {
  //creating new id if not exist
  if(arguments < 2 || id===undefined)
  {
    id=1;
    player.playlists.forEach(element=> {
      id+=element.id;
    });
  }

  //throw error if the given id is already exist
  player.playlists.forEach (element => {
    if(id===element.id){
      throw new Error("ID is already exist");
    }
  });

  //creating new playlist object and adding it to the playlists array
  var newPlay={
    id: id, name: name , songs: []
  };
  player.playlists.push(newPlay);
  return id;
}

function playPlaylist(id) {
//finding the wanted playlist and it index
var wantedPlay=player.playlists.find(element=> element.id==id) ;
var index = player.playlists.indexOf(wantedPlay);

//throw error if the id not exist
 if(index===-1)
 {
   throw new Error("ID is not exist");
 }

 //playing all the songs in the wanted playlist
wantedPlay.songs.forEach(element => playSong(element));

}
//some cool code

function editPlaylist(playlistId, songId) {
  var wantedPlay=player.playlists.find(element => element.id==playlistId) ;
  var indexP = player.playlists.indexOf(wantedPlay);

  //throw error if the id of the given song or playlist doesnt exist 
 if(indexP===-1)
 {
   throw new Error("ID playlist is not exist");
 }

 var wantedSong=player.songs.find(element => element.id==songId) ;
 var indexS = player.songs.indexOf(wantedSong);

  if(indexS===-1)
  {
    throw new Error("ID song is not exist");
  }

  //the index of the song in the playlist
  var indexSongPlaylist = player.playlists[indexP].songs.indexOf(songId);

  //adding song to playlist
  if(indexSongPlaylist===-1){
      player.playlists[indexP].songs.push(songId);

  //removing playlist
  }else if(player.playlists[indexP].songs.length === 1){
    player.playlists.splice(indexP, 1);
  }
  
  //removing song from playlist
  else{
    player.playlists[indexP].songs.splice(indexSongPlaylist, 1);
  }
}

function playlistDuration(id) {
  var sum=0;

  //getting the wanted playlist by id
  var wantedPlaylist= player.playlists.find(element => element.id==id) ;

  //if the song exist in the playlist, adding to the sum the duration
  for(let i=0; i<wantedPlaylist.songs.length; i++){
    var wantedSong =  player.songs.find(elem=> elem.id==wantedPlaylist.songs[i]);
    sum += wantedSong.duration;
  }
  return sum;

}


function searchByQuery(query) {
  //case-insensetive
  query=query.toLowerCase();
  let songs=[];
  let playlists=[];

  //checking if the query exist in the given songs array
  for(let song of player.songs){
    if (song.title.toLowerCase().includes(query) || 
        song.album.toLowerCase().includes(query) || 
         song.artist.toLowerCase().includes(query)){
           songs.push(song);
         }
        }

  //checking if the query exist in the given playlists array
  for(let playlist of player.playlists){
    if(playlist.name.toLowerCase().includes(query)){
      playlists.push(playlist);
    }
  }
  
  //sort songs array by title
  songs.sort(function (a, b) {
    if (a.title < b.title){
       return -1; }
    else if (a.title > b.title){
       return 1; }
    return 0;
  });

  //sort playlist array by name
  playlists.sort(function (a, b) {
    if (a.name < b.name){
       return -1; }
    if (a.name > b.name){
       return 1; }
    return 0;
  });
  
  return {songs , playlists};
}


function searchByDuration(duration) {
var durationArr=duration.split(":");
var time=parseInt(durationArr[0]*60) + parseInt(durationArr[1]) ;
  let closestObj;
  let minTime;

  //set minimum time according to duration 
  minTime=Math.abs( time-player.songs[0].duration);

  //search in songs
  for(let song of player.songs){
    if(Math.abs(time - song.duration) <= minTime){
      closestObj = song;
      minTime = Math.abs(time - song.duration);
    }
  }

  //search in playlists
  for (let playlist of player.playlists) {
    if (Math.abs(time - playlistDuration(playlist.id)) < minTime) {
      closestObj = playlist;
      minTime = Math.abs(time - playlistDuration(playlist.id));
    }
  }

  return closestObj;
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


