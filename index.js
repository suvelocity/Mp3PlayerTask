const { id } = require("prelude-ls")

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
        console.log(/* your code here */)
      },
    }
   
    



  
  
  function playSong(id) {
    if (typeof id === 'undefined') {
        return 'ID is invalid';
    
    }
    else {
       
      let songId = id;
      let obj = player.songs.find(obj => obj.id === songId);
      return 'Playing ' + obj.title + ' from ' + obj.album + ' by ' + obj.artist + ' | ' + obj.duration + '.';
    }
    }
    console.log(playSong(3));



  
  function removeSong(id) {
    if (typeof id === 'undefined') {
      return 'ID is invalid';
  }

  else {
    let songId2 = id;
    let obj2 = player.songs.find(obj2 => obj2.id === songId2);
    obj2.id = 'Removed';
    obj2.title = 'Removed';
    obj2.album = 'Removed';
    obj2.artist = 'Removed';
    obj2.duration = 'Removed';
    return player;
   }
  }
  console.log(removeSong(5));
     

    
     
    

  function addSong(title1, album1, artist1, duration1, id1) {
    player.songs.push ({
      id: id1 || Math.floor(Math.random() * 1000000000000000000000),
      title: title1,
      album: album1,
      artist: artist1,
      duration: duration1,
    });
    return player;
  }

  console.log(addSong('Sundress', 'Sundress', 'ASAP Rocky', '2:38', 7));


  function removePlaylist(id) {
    if (typeof id === 'undefined') {
      return 'ID is invalid';
  }

  else {
  let songId3 = id;
  let obj3 = player.playlists.find(obj3 => obj3.id === songId3);
  obj3.id = 'removed';
  obj3.name = 'removed';
  obj3.songs = 'removed';
  return player;
}
}

console.log(removePlaylist());
  
  

  function createPlaylist(name1, id1) {
    let playlistId1 = id1 || Math.floor(Math.random() * 1000000000000000000000);
    player.playlists.push ({
    id: playlistId1, name: name1, songs:[object]
  });
  return playlistId1;
}


console.log(createPlaylist('jazz', 2))

function playPlaylist(id) {
  if (typeof id === 'undefined') {
    console.log('ID is invalid');
}
else {
  let songId4 = id;
  let obj4 = player.playlists.find(obj4 => obj4.id === songId4); 
  
  for (let i = 0; i < obj4.songs.length; i++) {
      var obj5 = player.songs.find(obj5 => obj5.id === obj4.songs[i]);
      console.log('playing: ' + obj5.title);
    }     
 }
}
 playPlaylist(1);
 
   






    function editPlaylist(playlistId, songId5) {
      let obj7 = player.songs.find(obj7 => obj7.id === songId5);
      let obj6 = player.playlists.find(obj6 => obj6.id === playlistId);
      let index = obj6.id;
      for (let i = 0; i < obj6.songs.length; i++) {
        if (obj6.songs[i] === songId5){
          player.playlists[index].songs.splice(i, 1)
          if(player.playlists[index].songs.length === 0) {
            removePlaylist(playlistId);
          }
        } else{
          player[index].songs.push(songId5);
        }
      }
    }
    
   console.log(editPlaylist(5, 1)); 
  




  function playlistDuration(id) {
    if (typeof id === 'undefined') {
      return 'ID is invalid';
  }

  else {
  let playlistId3 = id;
  let obj5 = player.playlists.find(obj5 => obj5.id === playlistId3); 

  for (let i = 0; i < obj5.songs.length; i++) {
      var obj6 = player.songs.find(obj6 => obj6.id === obj5.songs[i]);
      // const sum =  [Object.values(obj6.duration)].reduce((partial_sum, a) => partial_sum + a,0);
      // console.log(sum);
     const sum = [obj6.duration].reduce((a, b) => a + b, 0)
     console.log(sum);
      console.log(obj6.duration);

    }     
 }  
}
playlistDuration(1)
  
  
 
    function searchByQuery(query) {
      let ObjSong = [
          {
            id: 0,
            title: '',
            album: '',
            artist: '',
            duration: 0,
          },];
          ObjSong.pop();
  
          let ObjPlaylist =[
          { id: 0, name: '', songs: [0, 1, 2, 3, 4, 5]},];
          ObjPlaylist.pop();
  
          for (let index = 0; index < player.songs.length; index++) {
          if (player.songs[index].title.includes(query)) {
              ObjSong.push(player.songs[index]);
          }
          else if (player.songs[index].album.includes(query)) {
              ObjSong.push(player.songs[index]); 
          }
          else if (player.songs[index].artist.includes(query)) {
              ObjSong.push(player.songs[index]); 
          }
          for (let i = 0; i < ObjSong.length; i++) {
            player.playSong(ObjSong[i])
          }
          }
          for (let t = 0; t < player.playlists.length; t++) {
          if (player.playlists[t].name) {
          }  
        }
      }
  
  

 
    function searchByDuration(duration) {
      let  playlistDuration === duration
      let objDuration = player.songs.find(objDuration => objDuration.duration === playlistDuration);
      return objDuration.closest()
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
  
