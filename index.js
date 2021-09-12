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
  const playlists= player.playlists;
  if(!id)
  {
    for(let i=0; i<playlists.length; i++)
    {
      if(Math.floor(Math.random())!==playlists[i].id)
      {
        id=Math.floor(Math.random());
      }
      
    }
    let newPlaylist= 
      { id: id, name: name, songs: [] };
    playlists.push(newPlaylist);
    return id;


  }
}

function playPlaylist(newId) 
{
  let yes=false;
  const playlists=player.playlists;
  for(j=0; j<playlists.length; j++)
  {
    if(newId===playlists[i].id)
    {
      yes=true;
    }
  }
 for(let i=0; i<playlists[newId].songs.length; i++)
 {
   playSong(playlists[newId].songs[i]);
 }
 if(yes===false)
 {
  throw new Error('ERROR: that id is not found.');
 }
}

function editPlaylist(playlistId, songId) {
  let songsList= [];
  let currentPlaylist= {id: 0, name: '', songs: [0]};
  currentPlaylist=null;
  const playlists=player.playlists;
  for(let i=0; i<playlists.length; i++)
  {
    if(playlists[i].id===playlistId)
    {
      currentPlaylist=playPlaylist[i];
      songsList= playlists[i].songs;
      break;
    }
    if(i==playlists.length-1)
    {
      throw new Error("Not found playlist");
      return;
    }
  }
  for(j=0; j<songsList.length; j++)
  {
    if(songId===songsList[j])
    {
      songsList.splice(j,1);
      if(songsList.length===0)
      {
        playlists.splice(j,1);
      }
      return;
    }
  }
  songsList.push(songId);
}

function playlistDuration(playlistId) {
  let totalDuration=0;
  let songNow=0;
  const playlists=player.playlists;
    for(let j=0; j<playlists[playlistId].songs.length; j++)
    {
      songNow= playlists[playlistId].songs[j];
      if(player.songs[id]===songNow)
      {
        totalDuration += player.songs[songNow].duration;
      }
    }
  return totalDuration;
}

function searchByQuery(query) {
  let resultObjectSong = [
    {
      id: 0,
      title: '',
      album: '',
      artist: '',
      duration: 0,
    },];
    resultObjectSong.pop();
  let resultObjectPlaylist =[
    { id: 0, name: '', songs: [0,1,2,3,4,5]},];
    resultObjectPlaylist.pop();
  for (let index = 0; index < player.songs.length; index++) {
    if (player.songs[index].title.includes(query)) {
      resultObjectSong.push(player.songs[index]);
    }
    else if (player.songs[index].album.includes(query)) {
      resultObjectSong.push(player.songs[index]); 
    }
    else if (player.songs[index].artist.includes(query)) {
      resultObjectSong.push(player.songs[index]); 
    }
    for (let j = 0; j < resultObjectSong.length; j++) {
      player.playSong(resultObjectSong[j])
    }
  }
  for (let t = 0; t < player.playlists.length; t++) {
    if (player.playlists[t].name) {
    }  
  }
}


function searchByDuration(duration)
 {
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

