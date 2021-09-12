//assistance functions

const { pipelinePrimaryTopicReference } = require("@babel/types");

//converts seconds to the required minute format
function secondsToMinutesConvertor(songDuration){
  let durationInMinutes = songDuration / 60;
  let minutes = 0;
  let seconds = 0;
  let lengthFormat = 0;
  minutes = Math.floor(durationInMinutes);
  if(minutes === 0){
    minutes = "00"
  }else{
      if(minutes < 10){
        minutes = "0" + minutes.toString();
      }else{
        minutes = minutes.toString();
      }
}
  seconds = (Math.round((durationInMinutes - minutes) * 60));
  if(seconds === 0){
    seconds = "00"
  }else {
      if( seconds < 10){
        seconds = "0" + seconds.toString();
      }else{
        seconds = seconds.toString();
      }
}
  lengthFormat = minutes + ":" + seconds
  return lengthFormat
}
 // converts string minutes format to secoonds
 function convertToseconds(durationInMinutes){
  let minutes = Number(durationInMinutes.split("").slice(0, 2).join(""));
  let seconds = Number(durationInMinutes.split("").slice(3, 5).join(""));
  let totalTime = (minutes * 60) + seconds;
  return totalTime
}
//recieves a song's id an returns that song's object
function getSongObjectById(id){
    let song = player.songs.filter(songObject => {
        if(songObject.id === id){
          return songObject;
        }
      })
      if(song.length == false){
        throw "undefined id";
      }
      song = song[0];
      return song;
}
// generat new ID function
function generatId(id, playlistsOrSongs, songsOrPlaylistsIdCounter){
  let newId = 0;
  let indexCounter = 0;
  if(!id){
      newId = songsOrPlaylistsIdCounter;
  }else{
      player[playlistsOrSongs].forEach(song => {
              if(song.id === id){
              throw "taken ID"
              }else{
                  indexCounter ++;
                  if(indexCounter === player[playlistsOrSongs].length){
                  newId = id;
                  }
          }
          });
  }
  songsOrPlaylistsIdCounter++;
  return newId
}
// get playlist by ID
function getPlaylistById(id){
  let indexCounter = 0;
  let playlistById = player.playlists.filter(playlist =>{
      if(playlist.id === id){
        return playlist;
      }else{
        indexCounter ++;
        if(indexCounter === player.playlists.length){
          throw "non existant ID"
        }
      }
    })
    return playlistById[0];
  }
  //closest song or playlist function
function initialClosest (songsOrPlaylists , totalTime){
  if(songsOrPlaylists === "playlists"){
      return Math.abs(totalTime -  playlistDuration(player.playlists[0]["id"]))
  }else{
     return Math.abs(totalTime - player[songsOrPlaylists][0].duration)
  }
}
//find closest song
function findClosest(songsOrPlaylists, closestTime, totalTime){
  let closest = player[songsOrPlaylists][0];
  player[songsOrPlaylists].forEach(song =>{
      if(songsOrPlaylists === "playlists"){
          let songDuration = playlistDuration(song["id"]);
          if(Math.abs(totalTime - songDuration) < closestTime){
              closestTime = Math.abs(totalTime - songDuration);
              closest = song;
          }
      }else{
          if(Math.abs(totalTime - song.duration) < closestTime){
              closestTime = Math.abs(totalTime - song.duration);
              closest = song;
          }
      } 
  })
  return closest;
}
//check for non existent ID
function IDchecker(id, playlistOrSong){
  let indexCounter = 0;
  player[playlistOrSong].forEach(object => {
    if (object.id === id){
      indexCounter = -1;
    } else{
      indexCounter ++;
      if(indexCounter === player[playlistOrSong].length){
        throw "non existent id"
      }
    }
  })
}
// main work
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
  playSong(id) {
    let song = getSongObjectById(id);
    song.duration = secondsToMinutesConvertor(song.duration);
    return("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + song.duration + ".")
  },
}
// playSong outside function
function playSong(id) {
 console.log(player.playSong(id))
}
playSong(5);
//remove song function
function removeSong(id) {
  let indexCounter = 0;
    player.songs.forEach(song => {
      if(song.id === id){
        player.songs.splice(indexCounter ,1);
      }else{
        indexCounter ++;
        if(indexCounter === player.songs.length){
          throw "Undefined ID"
        }
      }
    })
    player.playlists.forEach(playlist => {
      let playlistIndexCounter = 0;
      let songIndexCounter = 0;
      playlist.songs.forEach(song => {
        if (song === id){
           player.playlists[playlistIndexCounter].songs.splice(songIndexCounter, 1);
        }else{
          songIndexCounter ++;
        }
      })
    })
}
//add song function
let idCounter = 8;
function addSong(title, album, artist, duration, id) {
  let newSongId = generatId(id, "songs", idCounter);
  duration = convertToseconds(duration);
  let newSong = {
    "id" : newSongId,
    "title" : title,
    "album" : album,
    "artist" : artist,
    "duration" : duration
  }
  player.songs.push(newSong);
  return newSongId
}
//remove playlist function
function removePlaylist(id) {
  let indexCounter = 0;
  player.playlists.forEach(playlist => {
    if(playlist.id === id){
      player.playlists.splice(indexCounter ,1);
    }else{
      indexCounter ++;
        if(indexCounter === player.playlists.length){
          throw "Undefined ID"
        }
      }
    }) 
}
//create playlist function
let playlistIdCounter = 6;
function createPlaylist(name, id) {
  let playListId = generatId(id, "playlists", playlistIdCounter);
    console.log(playListId);
  let newPlaylist = {
    "id" : playListId,
    "name" : name,
    "songs" : []
  }
  player.playlists.push(newPlaylist);
  return playListId
}
// playPLaylist function
function playPlaylist(id) {
  let PlaylsitById = player.playlists.filter(playlist =>{
    if(playlist.id === id){
      return playlist;
    }
  })
  PlaylsitById[0].songs.forEach(song => playSong(song));
}

//edit playlist function
function editPlaylist(playlistId, songId){
  IDchecker(playlistId, "playlists");
  IDchecker(songId, "songs");
  let playlistIndexCounter = 0;
  player.playlists.forEach(playlist =>{
  let songsIndexCounter = 0;
  if(playlist.id === playlistId){
    playlist.songs.forEach(song => {
      if(songId === song){
         if(playlist.songs.length === 1){
           player.playlists.splice(playlistIndexCounter, 1)
         }else{
           playlist.songs.splice(songsIndexCounter, 1);
         }
      }else{
        songsIndexCounter ++;
        if(songsIndexCounter === playlist.songs.length){
          let indexCounter = 0;
          player.songs.forEach(song => {
            if(song.id === songId){
              player.playlists[playlistIndexCounter].songs.push(songId);
            }else{
              indexCounter ++;
            }
          })
        }
      }
    })
  }else{
    playlistIndexCounter ++;
  }
})
}
// playlistDuration function
function playlistDuration(id) {
   let requestedPlaylist = getPlaylistById(id);
   let songsLengthsArray = requestedPlaylist.songs.map(song => {
     return (getSongObjectById(song).duration);
   })
   let totalDuration = (songsLengthsArray.reduce((acc, value) => {
    acc += value;
    return acc;
  }))
  return totalDuration;
}
//search by query function
function searchByQuery(query) {
  let matchingSongs = player.songs.filter(song => {
    for(let property in song){
      if (song[property].toString().toLowerCase().includes(query.toLowerCase())){
        return song;
      }
    }
  })
  let matchingPlaylists = player.playlists.filter(playlist => {
    if(playlist.name.toLowerCase().includes(query.toLowerCase())){
      return playlist;
    }
  })
  matchingSongs = matchingSongs.sort((a, b) => {
    if(b["title"] < a["title"]){
        return 1;
    }
    if(b["title"] > a["title"]){
        return -1
    }
    return 0;
  });
  return {
    "songs" : matchingSongs,
    "playlists" : matchingPlaylists
  }
}
// search by duratiopn function
function searchByDuration(duration) {
  let totalTime = convertToseconds(duration);
  let closestSongtTime = initialClosest("songs", totalTime);
  let closestPlaylistTime = initialClosest("playlists", totalTime);
  let closestSong = findClosest("songs", closestSongtTime, totalTime);
  let closestPlaylist = findClosest("playlists", closestPlaylistTime, totalTime);
   if(closestSongtTime > closestPlaylistTime){
       return closestPlaylist;
   }else{
    return closestSong;
   }
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
