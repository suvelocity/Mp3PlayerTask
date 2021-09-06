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
  let min = Math.floor(seconds/60);
  min = min < 10 ? ('0' + min) : min;
  let sec = seconds%60;
  sec = sec < 10 ? ('0' + sec) : sec;
  return `${min}:${sec}`;
}

function convertToSec(minutes) {
  let min = minutes.slice(0, 2) * 60
  let sec = minutes.slice(3, 5)
  return Number(min)+Number(sec);
}

function playSong(id) {
  player.playSong(player.songs.filter(song => song.id === id)[0]);
}

function removeSong(id) {
  if (player.songs.findIndex(song => song.id === id) === -1) throw 'That song does not exist.';
  player.songs = player.songs.filter(obj => !(obj.id === id));
  player.playlists.forEach(playlist => playlist.songs = playlist.songs.filter(songId => !(songId === id)));
}

function addSong(title, album, artist, duration, id) {
  if (player.songs.findIndex(song => song.id === id) > -1) throw 'That id already exists.'
  while (id === undefined || player.songs.findIndex(song => song.id === id) > -1) {
    id = (Math.floor(Math.random()*1000));
  }
  player.songs.push({title, album, artist, duration: convertToSec(duration), id});
  return id;
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
