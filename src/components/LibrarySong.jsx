import React from 'react';

const LibrarySong = ({song, setCurrentSong, songs, id, audioRef, isPlaying, setSongs}) => {
   const {cover, name, artist, active} = song;

   const songSelectHandler = () => {
      setCurrentSong(song);
      audioRef.current.play();
      // Add active state
      const newSongs = songs.map(song => {
         if (song.id === id) {
            return {
               ...song,
               active: true
            }
         } else {
            return {
               ...song,
               active: false
            }
         }
      })
      setSongs(newSongs);
      playAudio(isPlaying, audioRef)
   }

   return (
      <div onClick={songSelectHandler} className={`library-song ${active ? 'selected' :''}`}>
         <img src={cover} alt={name}/>
         <div className="song-description">
            <h3>{name}</h3>
            <h4>{artist}</h4>
         </div>

      </div>
   );
};

export default LibrarySong;
