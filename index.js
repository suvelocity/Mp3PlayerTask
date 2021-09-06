const player = {
  songs: [
    {
      id: 1,
      title: 'chapter Four',
      album: 'walkingTheFallen',
      artist: 'avengedSevenfold',
      duration: 342,
    },
    {
      id: 2,
      title: 'afterLife',
      album: 'nightmare',
      artist: 'avengedSevenfold',
      duration: 352,
    },
    {
      id: 7,
      title: 'panic Station',
      album: 'The 2nd Law',
      artist: 'muse',
      duration: 184,
    },
    {
      id: 3,
      title: 'uprising',
      album: 'The resistence',
      artist: 'muse',
      duration: 304,
    },
    {
      id: 4,
      title: 'plug In Baby',
      album: 'Origin Of Symmetry',
      artist: 'muse',
      duration: 221,
    },
    {
      id: 5,
      title: 'your Latest Trick',
      album: 'brothers In Arms',
      artist: 'Dire straits',
      duration: 332,
    },
    {
      id:6,
      title:'The pretnder',
      alubm:'Echos,Silence,Patience&Grace',
      artist:'Foo Fighters',
      duration: 279,
    },
  ]
  
  playSong(song) {
    console.log(/* your code here */)
  },
}

function playSong(id) {
  // your code here
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
