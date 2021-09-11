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
  // This finds the index of the given id in the specific location given.
  const songOrPlaylist = location.findIndex(listElement => listElement.id === id);

  /* This checks if the id 'already' exists or 'does not' exist dependent on the exists arguement. 
  if the exists arguement is omitted when the function is called it will not check the id.*/
  if (songOrPlaylist > -1 && exists === 'already') throw new Error('That id already exists.');
  if (songOrPlaylist === -1 && exists === 'does not') throw new Error('That id does not exist.');
  return songOrPlaylist;
}

function playSong(id) {
  player.playSong(player.songs[checkIdFindIndex(id, player.songs, 'does not')]);
}

// This function removes a song from the player.songs array. Also, it removes that song from all playlists. 
function removeSong(id) {
  player.songs.splice(checkIdFindIndex(id, player.songs, 'does not'), 1)
  player.playlists.forEach(playlist => playlist.songs = playlist.songs.filter(songId => !(songId === id)));
}

function addSong(title, album, artist, duration, id) {
  checkIdFindIndex(id, player.songs, 'already')
  // If there is no id given the while loop will create one that does not already exist.
  while (id === undefined || checkIdFindIndex(id, player.songs) > -1) {
    id = (Math.floor(Math.random()*1000));
  }
  // This adds a song object to player.songs. It uses the arguements to do so.
  player.songs.push({title, album, artist, duration: convertToSec(duration), id});
  return id;
}

function removePlaylist(id) {
  player.playlists.splice(checkIdFindIndex(id, player.playlists, 'does not'), 1);
}

function createPlaylist(name, id) {
  checkIdFindIndex(id, player.playlists, 'already');
  while (id === undefined || checkIdFindIndex(id, player.playlists) > -1) {
    id = (Math.floor(Math.random()*100));
  }
  player.playlists.push({ id, name, songs: [] });
  return id;
}

/* This function calls the playSong function for each song id in the songs array of the given playlist.
This ultimately plays every song in the playlist.*/
function playPlaylist(id) {
  player.playlists[checkIdFindIndex(id, player.playlists, 'does not')].songs.forEach(songId => playSong(songId));
}

function editPlaylist(playlistId, songId) {
  checkIdFindIndex(songId, player.songs, 'does not');
  const playlist = player.playlists[checkIdFindIndex(playlistId, player.playlists, 'does not')];
  // removes or adds a song dependent on wether or not the playlist has the song or not.
  if (playlist.songs.includes(songId)) playlist.songs = playlist.songs.filter(song => song !== songId);
  else playlist.songs.push(songId);
  // if the playlist is left empty it will be removed from the player.
  if (playlist.songs.length === 0) removePlaylist(playlistId);
}

function playlistDuration(id) {
  let totalDuration = 0;
  const playlist = player.playlists[checkIdFindIndex(id, player.playlists)];
  playlist.songs.forEach(songId => totalDuration += player.songs[checkIdFindIndex(songId, player.songs)].duration);
  return totalDuration;
}

function searchByQuery(query) {
  const queryMatch = {
    playlists: [],
    songs: []
  };
  for (const song of player.songs) {
    if (song.title.includes(query) || song.album.includes(query) || song.artist.includes(query)) {
      queryMatch.songs.push(song);
    }
  }
  for (const playlist of player.playlists) {
    if (playlist.name.includes(query)) {
      queryMatch.playlists.push(playlist);
    }
  }
  // localeCompare allows you to sort the array of objects by object attributes.
  queryMatch.playlists.sort((a, b) => a.name.localeCompare(b.name));
  queryMatch.songs.sort((a, b) => a.title.localeCompare(b.title));
  return queryMatch;
}

function searchByDuration(duration) {
  duration=convertToSec(duration)
  let closestItem;
  let closestDuration = Infinity;
  for (const song of player.songs){
    if (Math.abs(song.duration-duration) < closestDuration) {
      closestDuration = Math.abs(song.duration-duration);
      closestItem = song;
    }
  }
  for (const playlist of player.playlists) {
    if (Math.abs(playlistDuration(playlist.id)-duration) < closestDuration) {
      closestDuration = Math.abs(playlistDuration(playlist.id)-duration);
      closestItem = playlist;
    }
  }
  return closestItem;
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
