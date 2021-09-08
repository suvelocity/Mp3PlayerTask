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

function playListsWiththeSong(id){//return array with index of any playlists that have this song
  let playListsIndexWithSong=[];
  for (let i = 0; i < player.playlists.length; i++) 
  {
      if(player.playlists[i].songs.includes(id)) playListsIndexWithSong.push(i);
  }
  return playListsIndexWithSong;
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

function addSong(title, album, artist, duration, id) {
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
