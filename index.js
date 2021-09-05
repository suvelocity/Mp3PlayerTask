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
  const playlist = getPlaylistById(id);
  if (!playlist) throw new Error('Bad ID');

  playlist.songs.forEach((song) => {
    playSong(song);
  });
}

function editPlaylist(playlistId, songId) {
  const { playlists } = player;
  playlistId = playlists.findIndex(({ id }) => id === playlistId);
  if (playlistId < 0) throw new Error('Bad playlist ID');
  if (!getSongById(songId)) throw new Error('Bad song ID');

  const indexInPlaylist = playlists[playlistId].songs.indexOf(songId);
  if (indexInPlaylist < 0) playlists[playlistId].songs.push(songId);
  else playlists[playlistId].songs.splice(indexInPlaylist, 1);

  if (playlists[playlistId].songs.length === 0)
    removePlaylist(playlists[playlistId].id);
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
