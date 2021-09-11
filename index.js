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

    const addedSong = // making a new song to push to the array
    {
      id: id,
      title: title,
      album: album,
      artist: artist,
      duration: reverseDurationConvertor(duration) // making sure the duration gets in with the right format
    };
    
    player.songs.push(addedSong);
    console.log(addedSong);
    console.log(player.songs);
    return addedSong["id"];
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
  const newPlaylist = {   // creates a new playlist with the arguments given
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
    if (currentSong === false)
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

let queryThings = {songs:[], playlists:[]};
let lowerCaseQuery = query.toLowerCase();


player.songs.forEach(song => {
  if (song.title.toLocaleLowerCase().includes(lowerCaseQuery) || song.album.toLocaleLowerCase().includes(lowerCaseQuery)|| song.artist.toLocaleLowerCase().includes(lowerCaseQuery))
  {
    queryThings.songs.push(song)
  }
})

player.playlists.forEach(playlist => {
  if (playlist.name.toLocaleLowerCase().includes(lowerCaseQuery))
  {
    queryThings.playlists.push(playlist)
  }
});

queryThings.songs.sort((a, b) => (a.title > b.title) * 2 - 1)
console.log(queryThings);
return queryThings;
}

function searchByDuration(duration) {
  let songDuration = reverseDurationConvertor(duration);
  let closestSong;
  let closestPlaylist;
  let lowestGapSong = 1000000;
  let lowestGapPlaylist = 1000000;
    for (let i in player.songs) // checks which songs is the closest to the given duration by comparing it to a "gap" variable.
    {
      if (Math.abs(songDuration - player.songs[i].duration) < lowestGapSong) 
      {
        lowestGapSong = Math.abs(songDuration - player.songs[i].duration);
        closestSong = player.songs[i];
      }
    }
    for (let j of player.playlists) { 
      if (Math.abs(songDuration - playlistDuration(j.id)) < lowestGapPlaylist) 
      {
        lowestGapPlaylist = Math.abs(songDuration - playlistDuration(j.id));
        closestPlaylist = j;
      }
    }

    if (lowestGapPlaylist < lowestGapSong) // checks if the gap between the songs is lower or greater then the gap between the playlist
    { 
     return closestPlaylist;
    }
    else
    {
      return closestSong
    }

}

//#region ALL THE EXTRA FUNCTIONS

function findSongById (id)
{
  let idToSongConvertor= player["songs"].find(finder=> finder["id"]===id);
  return idToSongConvertor;
}

function isSongInPlaylist (songId, playlistId) // checks if there is a spesific song in a playlist, if there isnt it returns false, if there is it returns the index of the song
{
  let playlist = findPlaylistById(playlistId);
  for (let i in playlist.songs) 
  {
    if (playlist.songs[i] === songId)
    {
      return i;
    }
    else 
    {
      return false;
    }
   
  }
}

function durationConvertor (duration) // convert duration format from seconds to MM:SS format
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

function reverseDurationConvertor (duration) // convert duration format from MM:SS to seconds format
{
  duration = duration.split(':')
  let minutes = parseInt(duration[0]) * 60
  let seconds = parseInt(duration[1])
  return minutes + seconds
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
// searchByDuration(200)
// searchByQuery("TAL");

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
