# MP3 Player - Second Weekend Assignment
So it is my second Weekend Task For Cyber4s. In this task I make simple player of music. The player have some methods and also many functions that help to user to add or remove or edit playlists or songs. In my work a tried to work effictly and avoid code duplications and improve work of the player. I use only JavaScript in this work also many syntax of ES6 in my project

## Requirements
The player itself is an object that has:
- `songs`: an array of songs
- `playlists`: an array of playlists
- `playSong`: a method that plays a song.

A song object has:
- `id`: a unique ID (a number)
- `title`: a title
- `album`: album title
- `artist`: artist name
- `duration`: duration (number, in seconds)

A playlist object has:
- `id`: a unique ID (a number)
- `name`: a name
- `songs`: an array of song IDs

## Functions
It is function that I have:
-`toCorrectDuration` - Gets a duration of the song in the seconds format. Transform seconds format in something more redble for people mm:ss format.
- `songById` - Gets a song ID. Check if Exist song with this ID Throw Erroo if not. Create a object of needed song.
- `playlistById` - Gets a playlist ID. Check if Exist playlist with this ID Throw Erroo if not. Create a object of needed playlist.
- `songIndex` - Gets a song object. Return index of this song in Array of songs of the player.
- `playlistIndex` - Gets a playlist object. Return index of this playlist in Array of plaulists of the player.
- `newId` - Gets a array of objects. Check all objects in the array and search the biggest id number. After that return maxId+1 that take me new id number that don`t used.
- `durationToSeconds` - Gets a duration in format mm:ss. And transform format to more useful for computer seconds format.
- `playSong` - Gets a song ID. Uses `player.playSong` to play the song with the given ID.
- `removeSong` - Gets a song ID. Removes the song with the given ID from the player (from songs and playlists).
- `addSong` - Gets a title, album, artist, duration & ID. Adds a new song with given properties to the player. The ID is optional, and if omitted should be automatically generated. The song duration should be in `mm:ss` format (for example 06:27). Returns the ID of the new song.
- `removePlaylist` - Gets a playlist ID. Remove the playlist with the given ID from the player (does not delete the songs inside it).
- `createPlaylist` - Gets a name & ID. Creates a new, empty playlist with the given details. The ID is optional, and if omitted should be automatically generated. Returns the ID of the new playlist.
- `playPlaylist` - Gets a playlist ID. Plays all songs in the specified playlist, in the order the appear in the playlist.
- `editPlaylist` - Gets a playlist ID & a song ID. If the song ID exists in the playlist, removes it. If it was the only song in the playlist, also deletes the playlist. If the song ID does not exist in the playlist, adds it to the end of the playlist.
- `playlistDuration` - Gets a playlist ID. Returns the total duration of the entire playlist with the given ID.
- `searchByQuery` - Gets a query string. Returns a results object, which has:
  - `songs`: an array of songs in which either title or album or artist contain the query string. The songs should be sorted by their titles.
  - `playlists`: an array of playlists in which the name contains the query string. The playlists should be sorted by their names.
  
  The comparison in both cases should be case-insensitive.
- `searchByDuration` - Gets a duration in `mm:ss` format (for example 11:03). Returns the song, or playlist, with the closest duration to what was given.

## Link to master repository and task https://github.com/suvelocity/Mp3PlayerTask

