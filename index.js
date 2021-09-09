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
  //function that looks for a song with a certin id in an array of songs.
  //and "plays" it.
  playSong(song) {
    let ans; // var to store the song with the right id.
    // search for the song in the array.
    this.songs.forEach(check => {
      if(check.id == song)
        ans = check;
    });
    let mmDuration;
    let ssDuration;
    try {
      //calculate the duration in mm:ss format.
      mmDuration = Math.floor(ans.duration / 60);
      if(mmDuration < 10)
        mmDuration = "0" + mmDuration;
      ssDuration = ans.duration - mmDuration * 60;
      //log the song in the right format.
      console.log(`Playing ${ans.title} from ${ans.album} by ${ans.artist} | ${mmDuration}:${ssDuration}.`);
    } catch (error) {
      //exception handling.
      console.log("error playing this song");
    }
  },
}

function playSong(id) {
  player.playSong(id);
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
