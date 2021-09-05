const player = require('./data');

player.playSong = (songId) => {
  const resultSong = getSongById(songId);
  if (!resultSong) throw new Error('Bad ID');

  const { title, album, artist, duration } = resultSong;

  console.log(
    `Playing ${title} from ${album} by ${artist} | ${formatDuration(duration)}.`
  );
};

const playSong = player.playSong;

function removeSong(id) {
  if (!getSongById(id)) throw new Error('Bad ID');

  player.songs = player.songs.filter((song) => song.id !== id);
  player.playlists.forEach((playlist) => {
    playlist.songs = playlist.songs.filter((songId) => songId !== id);
  });
}

function addSong(title, album, artist, duration, id) {
  if (getSongById(id)) throw new Error('Bad ID');
  id = id ?? player.generateSongsId();
  duration = durationToSeconds(duration);

  player.songs.push({ title, album, artist, duration, id });
  return id;
}

function removePlaylist(playlistId) {
  if (!getPlaylistById(playlistId)) throw new Error('Bad ID');
  player.playlists = player.playlists.filter(({ id }) => id !== playlistId);
}

function createPlaylist(name, id) {
  if (getPlaylistById(id)) throw Error('Bad ID');
  id = id ?? player.generatePlaylistId();

  player.playlists.push({ name, id, songs: [] });
  return id;
}

function playPlaylist(id) {
  const toPlay = getPlaylistById(id);
  if (!toPlay) throw new Error('Bad ID');

  toPlay.songs.forEach((song) => {
    playSong(song);
  });
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
};

const getSongById = (songId) => player.songs.find(({ id }) => id === songId);
const getPlaylistById = (playlistId) =>
  player.playlists.find(({ id }) => id === playlistId);

const formatDuration = (duration) =>
  ('00' + Math.floor(parseInt(duration) / 60)).slice(-2) +
  ':' +
  ('00' + (parseInt(duration) % 60)).slice(-2);

const durationToSeconds = (duration, [min, sec] = duration.split(':')) =>
  parseInt(min) * 60 + parseInt(sec);
