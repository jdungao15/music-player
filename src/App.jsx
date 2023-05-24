import './styles/app.scss';
import Player from "./components/Player.jsx";
import Song from "./components/Song.jsx";
import musicData from "./data/music-data.js";
import React, {useRef, useState} from "react";
import Library from "./components/Library.jsx";
import song from "./components/Song.jsx";
import Nav from "./components/Nav.jsx";

function App() {
   //State
   const [songs, setSongs] = useState(musicData);
   const [currentSong, setCurrentSong] = useState(songs[0]);
   const [isPlaying, setIsPlaying] = useState(false);
   const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0
   });
   const [libraryStatus, setLibraryStatus] = useState(false);


   const audioRef = useRef(null);

   const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      // Calculate percentage
      const roundedCurrent = Math.round(current);
      const roundedDuration = Math.round(duration);
      const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
      setSongInfo({
         ...song,
         currentTime: current,
         duration,
         animationPercentage
      });
   };

   const songEndedHandler = async () => {
      let currentIndex = songs.findIndex(song => song.id === currentSong.id);
      await setCurrentSong(songs[currentIndex + 1] || songs[0]);
      if (isPlaying) audioRef.current.play();
   }

   return (
      <div className={`App ${libraryStatus ? 'library-active': ''}`}>
         <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
         <Song currentSong={currentSong}/>
         <Player
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            currentSong={currentSong}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
         />
         <Library
            audioRef={audioRef}
            songs={songs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
         />
         <audio
            onLoadedMetadata={timeUpdateHandler}
            onTimeUpdate={timeUpdateHandler}
            ref={audioRef}
            src={currentSong.audio}
            onEnded={songEndedHandler}
         >

         </audio>
      </div>
   );
}

export default App;
