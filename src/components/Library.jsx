import React from 'react';
import LibrarySong from "./LibrarySong.jsx";

const Library = ({songs, setCurrentSong}) => {
   return (
      <div className="library">
         <h2>Library</h2>
         <div className="library-songs">
            {songs.map(song =>
               <LibrarySong
                  songs={songs}
                  setCurrentSong={setCurrentSong}
                  song={song}
               />
            )}
         </div>
      </div>
   );
};

export default Library;
