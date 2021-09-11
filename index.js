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
    return ("Playing "+ song.title + " from " + song.album + " by "+song.artist + " | "+durationConvertor(song.duration)+".") 
  },
}

function playSong(id) {
  let songPlayer = findSongById(id);
  if (songPlayer === undefined)
  {
    throw "This is not an existing song ID"
  }
  console.log(player.playSong(songPlayer));
}

function removeSong(id) {
  if (findSongById(id)===undefined)
  {
    throw "This is not a valid ID"
  }
  else {
    let songIndex= player.songs.indexOf(findSongById(id));
    player.songs.splice(songIndex,1); // removes the song from player.songs

    for (let i of player.playlists) // removes the song from all the playlists 
    {
      for (let j = 0; j < i.songs.length; j++)
      {
        if (i.songs[j] === id)
        {
          i.songs.splice(j,1);
        }
      }
    }
  }
  
}

function addSong(title, album, artist, duration, id) {

  if (findSongById(id) !== undefined)
  {
    throw "There is already a song with this ID"
  }
  
  if (id === undefined) 
  {
    id = Math.floor(Math.random()*50);
    while (id === findSongById(id)) //by defult the id will be a random number, but if there is already a song with the same id it will generate a new one until the new id is a unique one.
    {
      id = Math.floor(Math.random()*50);
    }
  }

    const newSong = // making a new song to push to the array
    {
      id: id,
      title: title,
      album: album,
      artist: artist,
      duration: duration
    };
    
    player.songs.push(newSong);
    console.log(newSong);
    console.log(player.songs);
    return newSong["id"];
}


function removePlaylist(id) {
    let isExist=false;  
    for (let i = 0; i<player.playlists.length; i++)
    {
      if (player.playlists[i]["id"] === id)
      {
        player.playlists.splice(i, 1)
        isExist=true;
      }
    }
      if (!isExist)
      {
        throw "There isnt a playlist with this ID"
      }
}

function createPlaylist(name, id) {
  if(findPlaylistById(id) !== undefined) 
  {
    throw "There is already a playlist with this ID";
  }

  if (id === undefined)
  { 
    id = Math.floor(Math.random()*50);
    while (id === findPlaylistById(id)) //by defult the id will be a random number, but if there is already a song with the same id it will generate a new one until the new id is a unique one.
    {
      id= Math.floor(Math.random()*50);
    }
  }
  const newPlaylist = {
    id:id,
    name:name,
    songs:[]
    };
    
  player.playlists.push(newPlaylist);
  console.log(newPlaylist);
  return newPlaylist["id"];
}


function playPlaylist(id) {
  if(findPlaylistById(id)===undefined)
  {
    throw "playlist id doesn't exist";
  }
  
  const currentPlaylist=findPlaylistById(id);
  for(let i=0; i<currentPlaylist.songs.length; i++)
  {
    playSong(currentPlaylist.songs[i]);
  }
}

function editPlaylist(playlistId, songId) { 

  let currentPlaylist = findPlaylistById(playlistId);   
  let currentSong= isSongInPlaylist(songId, playlistId) 

  if (findSongById(songId) && findPlaylistById(playlistId))
  {
    if (currentSong === -1)
    {
      currentPlaylist.songs.push(songId);
    }
    else if(currentPlaylist.songs.length > 1)
    {       
      currentPlaylist.songs.splice(currentSong,1); 
    }  
    else 
    {
      removePlaylist(currentPlaylist.id)
    }
  }
  else
  {
    throw "This ID does not exist"
  }
  
}


function playlistDuration(id) {
  let currentPlaylist = findPlaylistById(id);
  let sum = 0;

  for(let num in currentPlaylist.songs)
  {
    sum += findSongById(currentPlaylist.songs[num]).duration;
  }
  console.log(sum);
  return sum;
 
}


function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}


//#region ALL THE EXTRA FUNCTIONS
function findSongById (id)
{
  let idToSongConvertor= player["songs"].find(finder=> finder["id"]===id);
  return idToSongConvertor;
}

function isSongInPlaylist (songId, playlistId)
{
  let playlist = findPlaylistById(playlistId);
  for (let num in playlist.songs) 
  {
    return playlist.songs[num] === songId ?  num:-1;
  }
}

function durationConvertor (duration)
{
  let min="";
  let sec="";
  if (typeof(duration) !== "number")
  {
    throw "Please Enter a number"
  }
  min = Math.floor(duration/60);
  sec = duration%60;
  
  if (min < 10 && sec < 10)  //making sure the time format get out correctly
  {
  return("0"+min+":"+"0"+sec)
  }
  else if (min < 10 && sec > 10)
  {
    return("0"+min+":"+sec)
  }
  else if (min > 10 && sec < 10)
  {
    return(min+":"+"0"+sec)
  }
  else {
    return(min+":"+sec) 
  }

}

function findPlaylistById(id) //return playlist object by id
{
  let idToPlaylistConvertor= player.playlists.find(x=> x["id"]===id);
  return idToPlaylistConvertor;
}
//#endregion

//#region checking the functions
// addSong("New title", "New album", "New Album", 250, 10)
// playlistDuration(1)
// playPlaylist(1)
// createPlaylist("the Kazma playlist", 3)
//#endregion



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
