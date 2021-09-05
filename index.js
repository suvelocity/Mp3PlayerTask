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
    const duration = formatDuration(song.duration);
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${duration}.`)
  },
}

function formatDuration(duration){
  const formatTime = (num) => {
  //This arrow function adds a 0 if the time value is a single digit
  if(num<10) return "0" + num;
  else return num;
  };
  return formatTime(Math.floor(duration/60)) + ":" + formatTime(duration%60);
}

function unformatDuration(duration){
  const durationSplit = duration.split(":");
  return Number(durationSplit[0]) * 60 + Number(durationSplit[1]);
}

function getUnusedID(objArray){
  //This function works by finding largest id in objArray by value and adding 1
  let maxID = 0;
  for (let i = 0; i < objArray.length; i++){
    if (objArray[i].id > maxID) maxID = objArray[i].id;
  }
  return maxID + 1;
}

function getIndexByIDFromList(objArray, id){
  //Returns index in objArray by ID, returns -1 if not found
  for (let i = 0; i < objArray.length; i++){
    if (objArray[i].id === id){
      return i;
    }
  }
  return -1;
}

function removeSongFromPlaylistByID(playlist, songID){
  const indexInPlaylist = playlist.songs.indexOf(songID);
  if(indexInPlaylist >= 0) playlist.songs.splice(indexInPlaylist, 1); //Delete song from playlist
}


function playSong(id) {
  const index = getIndexByIDFromList(player.songs, id);
  if(index === -1) throw "ID not found";
  player.playSong(player.songs[index])
}

function removeSong(id) {
  const indexInSongs = getIndexByIDFromList(player.songs, id);
  if (indexInSongs === -1) throw "ID not found";

  player.songs.splice(indexInSongs, 1); //Delete from songs

  for (const playlist of player.playlists){
    removeSongFromPlaylistByID(playlist, id)
  }
}

function addSong(title, album, artist, duration, id) {
  if(id === undefined) id = getUnusedID(player.songs); //Get id if id not given
  if(getIndexByIDFromList(player.songs, id) !== -1) throw "ID Already Exists";
  duration = unformatDuration(duration);
  player.songs.push({title, album, artist, duration, id});
  return id;
}

function removePlaylist(id) {
  const playListIndex = getIndexByIDFromList(player.playlists, id);
  if (playListIndex === -1) throw "ID not found";
  player.playlists.splice(playListIndex, 1);
}

function createPlaylist(name, id) {
  if(id === undefined) id = getUnusedID(player.songs); //Get id if not given
  if(getIndexByIDFromList(player.playlists, id) !== -1) throw "ID Already Exists";
  player.playlists.push({name, id, songs:[]}) //Create new empty playlist
  return id;
}

function playPlaylist(id) {
  const playListIndex = getIndexByIDFromList(player.playlists, id);
  if(playListIndex === -1) throw "Playlist not found!";
  const playlist = player.playlists[playListIndex];
  for (const song of playlist.songs){
    player.playSong(song);
  }
}

function editPlaylist(playlistId, songId) {
  const playListIndex = getIndexByIDFromList(player.playlists, playlistId);
  if(playListIndex === -1) throw "Playlist not found!";
  const playlist = player.playlists[playListIndex];

  const indexInSongs = getIndexByIDFromList(player.songs, songId);
  if (indexInSongs === -1) throw "ID not found";
  const song = player.songs[indexInSongs];

  if(playlist.songs.indexOf(songId) === -1){ //If song not in playlist add it to the end
    playlist.songs.push(songId)
  }else{
    removeSongFromPlaylistByID(playlist, songId) //If song is in playlist remove the song
    if (playlist.songs.length === 0) removePlaylist(playlistId); //If the playlist is empty delete it
  }
}

function playlistDuration(id) {
  const playListIndex = getIndexByIDFromList(player.playlists, id);
  if(playListIndex === -1) throw "Playlist not found!";
  const playlist = player.playlists[playListIndex];

  let duration = 0;
  for (const songId of playlist.songs){
    const song = player.songs[getIndexByIDFromList(player.songs, songId)];
    duration += song.duration;
  }
  return duration;
}

console.log(playlistDuration(1))

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