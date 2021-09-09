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
  // your code here
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


//#region ALL THE EXTRA FUNCTIONS
function findSongById (id)
{
  let idToSongConvertor= player["songs"].find(finder=> finder["id"]===id);
  return idToSongConvertor;
}


function durationConvertor (duration)
{
  let min="";
  let sec="";
  if (typeof(duration) !== "number" || typeof(duration) === undefined)
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
