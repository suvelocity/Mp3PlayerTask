const player = require('./data')

player.playSong = (songId) => {
  const resultSong = player.songs.find((song) => song.id === songId)
  if (!resultSong) throw new Error('Bad ID')

  const { title, album, artist, duration } = resultSong

  console.log(
    `Playing ${title} from ${album} by ${artist} | ${(
      '00' + Math.floor(duration / 60)
    ).slice(-2)}:${('00' + (duration % 60)).slice(-2)}.`
  )
}

function playSong(id) {
  player.playSong(id)
}

function removeSong(id) {
  // your code here
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
