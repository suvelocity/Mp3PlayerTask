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
    console.log(`Playing ${song.title} from ${song.album} by ${(song.artist)} | ${mmssDuration(song.duration)}.`);
  }
}
const mmssDuration=(duration)=> {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes.toString() + ':' + seconds.toString();
  }

  const getSongById= (id)=>{
    for (let num in player.songs) { 
      if (player.songs[num].id === id){ 
        return player.songs[num]; 
    }
  }
    throw new Error("No song was found");
  }

  function playSong(id) {
      if(getSongById(id)===undefined){
      throw " ${id} ID not exists";
    }
    return player.playSong(getSongById(id));
  }
  
  function removeSong(id) {
    if(getSongById(id)===undefined){
      throw new Error("${id} ID not valid");
    }
  player.songs.splice(getSongById(id),1);
    for(let num1 in player.playlists){            
      for(let num2 in player.playlists[num1].songs){  
        if(player.playlists[num1].songs[num2] ===id){
          player.playlists[num1].songs.splice(num2,1);
         }
      }
    }
  }
  
  const idExist=(id)=> {
    for (let num in player.songs) {
      if (player.songs[num].id === id)
        return true;
    }
    return false;
  }

  const secondsFormat= (duration)=>{
    let sum = duration.split(":");
    let minute = parseInt(sum[0]) * 60;
    let second = parseInt(sum[1]);
  
    return minute + second;
  }
  
  function addSong(title, album, artist, duration, id = Math.floor(Math.random() * 100) + 1){
    if(idExist(id)){
      throw new Error("${id} ID already exists");
    }
    else{
      player.songs.push({id: id, title: title,album: album,artist: artist,duration:secondsFormat(duration)});
        return id;
    }
  }
  
  const getPlaylistById=(id) =>{
    for (let num in player.playlists) {
      if (player.playlists[num].id === id)
        return player.playlists[num];
    }
    throw new Error("${id} ID not exists");
  }

  function removePlaylist(id) {
    if(getPlaylistById===undefined){
      throw new Error("${id} ID not exists");
    }
    let playlistIndex = player.playlists.indexOf(getPlaylistById(id));
    player.playlists.splice(playlistIndex, 1);
  }

  const playlistIdExist= (id)=>{
    for (let i in player.playlists) {
      return player.playlists[i].id === id? true:false;
    }
  }
  
  function createPlaylist(name, id = Math.floor(Math.random() * 100) + 1) {
      if(playlistIdExist(id)){
        throw new Error("${id} ID already exists");
      }
      else{
        player.playlists.push({id: id,name: name,songs:[]});
      return id;
      }
    }
  
  function playPlaylist(id) {
    if(getPlaylistById(id)===undefined){
      throw new error("${id} ID not exists");
    }
    let playlist = getPlaylistById(id);
    for(let num = 0; num < playlist.songs.length; num++){
      playSong(playlist.songs[num]);
    }
  }
  
  const songInPlaylist=(songId, playlistId)=>{
    let playlist = getPlaylistById(playlistId);
    for (let num in playlist.songs) {
      return playlist.songs[num] === songId? num:-1;
    }

  }
  function editPlaylist(playlistId, songId) {
    let playlist = getPlaylistById(playlistId);   
     let songIn= songInPlaylist(songId, playlistId);   
    if(idExist(songId) && playlistIdExist(playlistId)){       
      if(songIn === -1) {                           
        playlist.songs.push(songId);                 
      } 
      else if(playlist.songs.length > 1){       
        playlist.songs.splice(songIn,1); 
      } 
      else{ 
        removePlaylist(playlist.id);  
      }
    } 
    else{ 
      throw new Error("${id} ID not exists"); 
    } 
  }
  
  function playlistDuration(id) {
    let playlist = getPlaylistById(id);
    let result = 0;
    for(let num in playlist.songs){
      result+= getSongById(playlist.songs[num]).duration;
    }
    return result;
  }
  
  function searchByQuery(query) {
  const results = { songs: [], playlists: [] }
    let myQuery = query;
    for (let i in player.songs) {
      if (player.songs[i].album.includes(myQuery) || player.songs[i].artist.includes(myQuery) ||  player.songs[i].title.includes(myQuery))
         {
          results.songs.push(player.songs[i])
         }
    } 
    results.songs.sort(function (first,second){
        if (first.title < second.title){
          return -1;
             }
          return first.title>second.title? 1:0;
          
          })
        for (let num in player.playlists) {
          if (player.playlists[num].name.includes(myQuery)) {
            results.playlists.push(player.playlists[num])
            results.playlists.sort((first,second) => {
              if (first.name < second.name){ 
                 return -1;
              }
         })
       }
    return results
    }  
  }
  
  function searchByDuration(duration) {
    let mmss = secondsFormat(duration);
    let closestSong;
    let bestTime;
    if (mmss > player.songs[0].duration){
      bestTime = mmss;
    }
    else{
      bestTime = player.songs[0].duration;
    }
    for(let song of player.songs){
      if(Math.abs(mmss - song.duration) < bestTime){
        closestSong = song;
        bestTime = Math.abs(mmss - song.duration);
      }
    }
    for (let playlist of player.playlists) {
      if (Math.abs(mmss - playlistDuration(playlist.id)) < bestTime) {
        closestSong = playlist;
        bestTime = Math.abs(mmss - playlistDuration(playlist.id));
      }
    }
    return closestSong;
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