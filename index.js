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
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${convertToMin(song.duration)}.`);
  },
}

function convertToMin(seconds) {
  const min = Math.floor(seconds/60);
  const sec = seconds%60;
  return `${min < 10 ? ('0' + min) : min}:${sec < 10 ? ('0' + sec) : sec}`;
}

function convertToSec(minutes) {
  return Number(minutes.slice(0, 2)) * 60 + Number(minutes.slice(3, 5));
}

function checkIdFindIndex(id ,location, exists) {
  const songOrPlaylist = location.findIndex(listElement => listElement.id === id);
  if (songOrPlaylist > -1 && exists === 'already') throw new Error('That id already exists.');
  if (songOrPlaylist === -1 && exists === 'does not') throw new Error('That id does not exist.');
  return songOrPlaylist;
}

function playSong(id) {
  player.playSong(player.songs.filter(song => song.id === id)[0]);
}

function removeSong(id) {
  player.songs.splice(checkIdFindIndex(id, player.songs, 'does not'), 1)
  player.playlists.forEach(playlist => playlist.songs = playlist.songs.filter(songId => !(songId === id)));
}

function addSong(title, album, artist, duration, id) {
  checkIdFindIndex(id, player.songs, 'already')
  while (id === undefined || checkIdFindIndex(id, player.songs) > -1) {
    id = (Math.floor(Math.random()*1000));
  }
  player.songs.push({title, album, artist, duration: convertToSec(duration), id});
  return id;
}

function removePlaylist(id) {
  player.playlists.splice(checkIdFindIndex(id, player.playlists, 'does not'), 1);
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
