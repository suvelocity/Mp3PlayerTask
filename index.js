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
    const minutes = Math.floor(song.duration/60);
    const minutesWithZero = minutes < 10 ? "0" + minutes : minutes;
    console.log("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + minutesWithZero + ":" + song.duration%60 + ".");
  }
}

function playSong(id) {
  const songs = player.songs;
  for(let i=0; i<songs.length; i++)
  {
    if(id===songs[i].id)
    {
      player.playSong(songs[i]);
      return;
    }
  }
  throw new Error('Song id not found.');
}

function removeSong(id) {
  const songs = player.songs;
  let isSongExist= false;
  for(let i=0; i<songs.length; i++)
  {
    if(id===songs[i].id)
    {
      isSongExist=true;
      songs.splice(i, 1);
    }
  }
  if(!isSongExist) throw new Error('Song id not found.');

  const playlists=player.playlists;
  for(let j=0; j<playlists.length; j++)
  {
    const songIndex=playlists[j].songs.indexOf(id);
    if(songIndex != -1)
    {
     playlists[j].songs.splice(songIndex,1) 
    }
  }
}

function addSong(title, album, artist, duration, id) {
 let new_id = 0;
 duration=duration.split(":");
 duration= parseInt(duration[0]*60) + parseInt(duration[1]);
 const songs = player.songs;
 if(id)
 {  
   for(let i=0; i<songs.length; i++)
   {
      if(id==songs[i].id)
      {
        throw new Error('ERROR: that id is taken.');
      }
   }
   new_id= id;
 }
 else{
   let max=1;
   for(let j=0; j<songs.length; j++)
   {
     if(max<songs[j].id)
     {
       max=songs[j].id
     }
   }
   new_id=max+1;
 }
 let newSong = {
   id: new_id,
   title: title,
   album: album,
   artist: artist,
   duration: duration,
 }
 songs.push(newSong);
 return new_id;
}

function removePlaylist(id) {
  const playlists=player.playlists;
  let ifIdExist=false;
  for(let i=0; i<playlists.length; i++)
  {
    if(playlists[i].id===id)
    {
      playlists.splice(i,1);
      ifIdExist=true;
    }
    
  } 
  if(!ifIdExist) throw new Error('ERROR: that id is not found.');
}

function createPlaylist(name, id) {
  let newId=0;
  let newPlaylist= 
    {id: id, name: name, songs:[]},
    for (let index = 0; index < player.playlists.length; index++) {
      if(player.playlists[index].id>newId)
      {
        newId=player.playlists[index].id;
      }
    }
    return newId+1;
  
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
}
