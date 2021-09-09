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
  playSong(song){
    console.log(`"Playing ${song.title} from ${song.album} by ${song.artist} | ${convertDuration1(song.duration)}."`);
    }
  }


function playSong(id) {
 for (let i=0;i<player.songs.length ;i++){
   if (player.songs[i].id===id){
     return  (player.songs[i])
   }
 }
 throw ("non-existent ID,try another one")
}

function removeSong(id) {
  let a=0;
    for(let x=0;x<player.songs.length ;x++){
      if (player.songs[x].id===id) a=1}
    if (a===0)
      throw ("non-existent ID,try another one");
  for (let i=0;i<player.songs.length ;i++){
    if (player.songs[i].id===id){
      player.songs.splice(i,1)
    }
  }
  for (let i=0;i<player.playlists.length;i++){
    for (let j=0;j<player.playlists[i].songs.length;j++){
      if (player.playlists[i].songs[j]===id)
        player.playlists[i].songs.splice(j,1);
    }
  }
}

function maxID (arr)
{
  let max=0;
  for (let i = 0; i < arr.length; i++)
  {
    if (arr[i].id > max)
      max = arr[i].id;
  }
  return max;
}

function addSong(title, album, artist, duration, id) {
  if (id===undefined)
  id=maxID(player.songs)+1;
  let time=0;
  let a=0;
  for(let x=0 ;x<player.songs.length ; x++){
    if (player.songs[x].id===id) a=1}
  if (a===1)
    throw ("existent ID,try another one");
  let arr=duration.split(":")
  var c = parseInt(arr[0])
  var b = parseInt(arr[1])
  time =(c*60 + b)
  player.songs.push({"id":id,
                    "title":title,
                    "album":album,
                    "artist":artist,
                    "duration":time
                    })
  return player.songs[player.songs.length-1].id
}

function removePlaylist(id) {
    let a=0;
    for (let i=0;i<player.playlists.length;i++){
      if (player.playlists[i].id===id){
        a=1
        player.playlists.splice(i,1)
      }
    }
    if (a===0) throw ("non-existent id , try another")
    
}

function createPlaylist(name, id=10) {
  let a=0;
  for(let x=0;x<player.playlists.length ;x++){
    if (player.playlists[x].id===id) a=1 }
    if (a===1) throw ("existent ID,try another one");
    player.playlists.push({
      "id":id,
      "name":name,
      "songs":[]
})
  return player.playlists[player.playlists.length-1].id
}

function playPlaylist(id) {
  let a=0;
  for (let i=0;i<player.playlists.length;i++){
    if (player.playlists[i].id===id){
      a=1;
      let arr=player.playlists[i].songs;
      for (let j=0;j<arr.length;j++){
        for (let x=0 ;x<player.songs.length; x++){
          if (player.songs[x].id===arr[j])
          console.log(player.songs[x])
        }
      }
    }
  }
  if (a===0)throw ("non-existent id,try another")

}

function editPlaylist(playlistId, songId) {
  let z=0;
  for (let j=0;j<player.songs.length;j++){
    if (player.songs[j].id===songId){
      z=1;
    }
  }
  if (z===0)throw ("non existing songId please try another")
  let a=0;
  let y;
  let list;
  for (let x=0;x<player.playlists.length;x++){
    if(player.playlists[x].id===playlistId){
      list= player.playlists[x]
    }
  }
  for (let i=0;i<list.songs.length;i++){
    if (list.songs[i]===songId&&list.songs.length<2){
      a=1;
      player.playlists.splice(y,1)}
    else if (list.songs[i]===songId&&list.songs.length>1){
      a=1;
      list.songs.splice(i,1)}
  }
  if (a===0){ list.songs.push(songId) }
}


function playlistDuration(id) {
  let sum=0;
  let list;
  try {for (let x=0;x<player.playlists.length;x++){
    if(player.playlists[x].id===id){
      list= player.playlists[x]
    }
  }
  for (let i=0;i<list.songs.length;i++){
    for (let j=0;j<player.songs.length;j++){
      if (list.songs[i]===player.songs[j].id){
       sum +=player.songs[j].duration;
      continue;
      }
    }
  }
  return sum
}
catch{ throw ("non-existent playlist Id please try another")}
}

function searchByQuery(query) {
  query=query.toLowerCase()
  let results={Playlists:[],
              Songs:[]}
  for (let x=0;x<player.songs.length;x++){
    if (player.songs[x].title.toLowerCase().includes(query)||
        player.songs[x].album.toLowerCase().includes(query)==true||
        player.songs[x].artist.toLowerCase().includes(query)==true){
          results.Songs.push(player.songs[x])
    }
  }
  for (let i=0 ;i<player.playlists.length;i++){
    if (player.playlists[i].name.toLowerCase().includes(query)){
      results.Playlists.push(player.playlists[i])
    }
  }
  return results;
}
function close(goal,counts){
  var closest = counts.reduce(function(prev, curr) {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  });
  
  return (closest);
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
