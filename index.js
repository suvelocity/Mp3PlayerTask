
'use strict'
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
    console.log(
      `Playing ${song.title} from ${song.album} by ${song.artist} | ${sTOmmss(
        song.duration
      )}.`
    )
  },
}
function songById(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i]['id'] === id) return player.songs[i]
  }
  return undefined
}
function songIndexById(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i]['id'] === id) return i
  }
  return -1
}
function isIdExsistInSongs(id) {
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i]['id'] === id) return true
  }
  return false
}
function isIdExsistInPlayLists(id) {
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i]['id'] === id) return true
  }
  return false
}
function playListById(id){
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i]['id'] === id) return player.playlists[i]
  }
  return undefined
}
function playListIndexById(id){
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i]['id'] === id) return i
  }
  return -1
}



function addToPlayList(songId,playlistId){
  let song=songById(songId);
  player.playlists[playListIndexById(playlistId)].songs.push(song.id)
}

function removeFromPlayLists(songId){
  for(let i=0;i<player.playlists.length;i++){
    if (player.playlists[i].songs.includes(songId)){
      for(let j=0;j<player.playlists[i].songs.length;j++){
        if(player.playlists[i].songs[j]===songId){
          player.playlists[i].songs.splice(j,1)
        }
      }
    }
  }
}
function removeFromPlayList(songId,playlistId)
{
  for(let i=0;i<playListById(playlistId).songs.length;i++){
   if(player.playlists[playListIndexById(playlistId)].songs[i]===songId){
    player.playlists[playListIndexById(playlistId)].songs.splice(i,1)
   }
  }
}

function playSong(id) {
    if (songById(id) === undefined) {
      throw new Error('non-existent ID')
    }
    player.playSong(songById(id))
}

function sTOmmss(s) {
  const mm = Math.floor(s / 60)
  const ss = s % 60
  let mmss = ''
  if (mm > 9 && ss > 9) mmss = `${mm}:${ss}`
  if (mm > 9 && ss <= 9) mmss = `${mm}:0${ss}`
  if (mm <= 9 && ss > 9) mmss = `0${mm}:${ss}`
  if (mm <= 9 && ss <= 9) mmss = `0${mm}:0${ss}`
  return mmss
}
function mmssTOs(mmss) {
  return parseInt(mmss.slice(0, 2)) * 60 + parseInt(mmss.slice(3, 5))
}


function removeSong(id) {
    if (songIndexById(id) === -1) {
      throw new Error('non-existent ID')
    }
    player.songs.splice(songIndexById(id),1);
    removeFromPlayLists(id);
}

function addSong(title, album, artist, duration, id=0) {
  const newSong = {}
  newSong.title = title
  newSong.album = album
  newSong.artist = artist
  newSong.duration = mmssTOs(duration)
  if (!isIdExsistInSongs(id)) newSong.id = id
  else {
    for (let i = 0; i < player.songs.length + 1; i++) {
      if (!isIdExsistInSongs(i)) {
        newSong.id = i
      }
    }
    throw new Error(`existent ID,the chosen id is ${newSong.id}`)
  }
  player.songs.push(newSong)
  return newSong.id
}


function removePlaylist(id) {
  if (playListIndexById(id) === -1) {
    throw new Error('non-existent ID')
  }
  player.playlists.splice(playListIndexById(id),1);
}

function createPlaylist(name, id=0) {
  let newPlayList={name,songs:[]};
  if (!playListById(id)) newPlayList.id=id;
  else{
    for (let i = 0; i < player.playlists.length + 1; i++) {
      if (!isIdExsistInPlayLists(i)) {
        newPlayList.id = i
      }
    }
    throw new Error(`existent ID,the chosen id is ${newPlayList.id}`)
  }
  player.playlists.push(newPlayList);
  return newPlayList.id;
}
function playPlaylist(id) {
  if (playListIndexById(id) === -1) {
    throw new Error('non-existent ID')
  }
  let playlist=playListById(id);
  for(let i=0;i<playlist.songs.length;i++){
    playSong(playlist.songs[i])
  }
}

function editPlaylist(playlistId, songId) {  
  if (playListById(playlistId) === undefined) {
    throw new Error('non-existent playlistId')
  }
  if (songById(songId)===undefined) {
    throw new Error('non-existent songId')
  }
  let playlist=playListById(playlistId);
  if(playlist.songs.includes(songId)&&playlist.songs.length===1)removePlaylist(playlistId)
  else if(playlist.songs.includes(songId)&&playlist.songs.length!==1){
    removeFromPlayList(songId,playlistId)
  }
  else if(!playlist.songs.includes(songId)){
    addToPlayList(songId,playlistId)
  }
}

function playlistDuration(id) {
  if (playListById(id) === undefined) {
    throw new Error('non-existent playlistId')
  }
  const playlist=playListById(id);
  let sum=0;
  for(let i=0;i<playlist.songs.length;i++){
    let song=songById(playlist.songs[i])
    sum+=song.duration;
  }
  return sum;

}
function comparepl (a,b){
    let fa=a.name.toLowerCase(),
        fb=b.name.toLowerCase();
    if(fa<fb){
        return -1;
    }
    if(fa > fb){
        return 1;
    }
    return 0;
  };
function compares (a,b){
    let fa=a.title.toLowerCase(),
        fb=b.title.toLowerCase();
    if(fa<fb){
        return -1;
    }
    if(fa > fb){
        return 1;
    }
    return 0;
  };
function searchByQuery(query) {
  let lowerCasedQuery=query.toLowerCase()
  let found={};
  let playlists=[]
  let songs=[];
  for(let i=0;i<player.playlists.length;i++){
    if(player.playlists[i].name.toLowerCase().includes(lowerCasedQuery)){
      playlists.push(player.playlists[i]);
    }
  }
  for(let i=0;i<player.songs.length;i++){
    const song =player.songs[i];
    if(song.title.toLowerCase().includes(lowerCasedQuery)||
    song.album.toLowerCase().includes(lowerCasedQuery) ||
     song.artist.toLowerCase().includes(lowerCasedQuery)){
      songs.push(song);
    }
  }
  found.playlists= playlists.sort(comparepl);
  found.songs=songs.sort(compares);
  return found;
}
function searchByDuration(duration) {
  duration=mmssTOs(duration)
  let closestPlayList=player.playlists[0];
  let closestsong=player.songs[0];
  for(let i=0;i<player.playlists.length;i++){
    let a=playlistDuration(player.playlists[i].id);
    let b=playlistDuration(closestPlayList.id);
    if((a-duration)**2<(b-duration)**2){
      closestPlayList=player.playlists[i];
    } 
  }
  for(let i=0;i<player.songs.length;i++){
    let a=player.songs[i].duration
    let b=closestsong.duration
    if((a-duration)**2<(b-duration)**2){
      closestsong=player.songs[i];
    } 
  }
  let a=closestsong.duration
  let b=playlistDuration(closestPlayList.id)
  if((a-duration)**2<(b-duration)**2) return closestsong;
  return closestPlayList;
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
