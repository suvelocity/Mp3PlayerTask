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
    console.log("Playing "+player.songs[song].title+" from "+player.songs[song].album+" by "+player.songs[song].artist+" | "+songDuration(player.songs[song].duration)+".");
  },

}
function playSong(id) {
  let num=songById(id);
  if(num==-1)
    throw("ID doesn't exist");
  player.playSong(num);
}
playSong(1);

removeSong(4);
function removeSong(id) {
  let idR = songById(id);
  if (idR==-1)
    throw("ID doesn't exist!");
  player.songs.splice(idR,1);
  for (let i = 0; i < player.playlists.length; i++) {
    for (let j = 0; j < player.playlists[i].songs.length; j++) {
      if(player.playlists[i].songs[j]==id){
        player.playlists[i].songs.splice(j,1);
      console.log(player.playlists[i].songs.length);
    }
  } 
} 
}
function addSong(title, album, artist, duration, id) {
if(songById(id)!=-1){
 let num=1;
 while(songById(num)==-1)
 {
   num++;
 }
 id=num;
 let temp = duration.split(":");
  let min = temp[0]*60;
  let sec = temp[1]*1
  let ssduration = min + sec;
}
player.songs.push({id:id,title:title,album:album,artist:artist,duration:ssduration});
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
// found the index in the array of the id
function songById(idT)
{
  for (let i = 0; i < player.songs.length; i++) {
    if(player.songs[i].id==idT)
      return i;
  }
  return -1;
}
// get duration and return it in min:sec format
function songDuration(duration){
  let min=0;
  while(duration >=60)
  {
    min++;
    duration-=60;
  }
  if(duration<10)
    return "0"+min+":0"+duration;
  return "0"+min+":"+duration;
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

