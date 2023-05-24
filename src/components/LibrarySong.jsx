import React from 'react';

const LibrarySong = ({song, setCurrentSong, songs, id}) => {
   const {cover, name, artist} = song;

   const songSelectHandler = () => {
      setCurrentSong(song);
   }

   return (
      <div onClick={songSelectHandler} className="library-song">
         <img src={cover} alt={name}/>
         <div className="song-description">
            <h3>{name}</h3>
            <h4>{artist}</h4>
         </div>

      </div>
   );
};

export default LibrarySong;
