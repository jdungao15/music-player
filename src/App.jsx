import './styles/app.scss';
import Player from "./components/Player.jsx";
import Song from "./components/Song.jsx";
import musicData from "./data/music-data.js";
import React, {useRef, useState} from "react";
import Library from "./components/Library.jsx";
import song from "./components/Song.jsx";

function App() {
   const [songs, setSongs] = useState(musicData);
   const [currentSong, setCurrentSong] = useState(songs[0]);
   const [isPlaying, setIsPlaying] = useState(false);
   const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0
   });



   const audioRef = useRef(null);

   const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo({...song, currentTime: current, duration});
   };

   return (
      <div className="App">
         <Song currentSong={currentSong}/>
         <Player
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            currentSong={currentSong}
         />
         <Library songs={songs}
                  setCurrentSong={setCurrentSong}
         />
         <audio
            onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
         >

         </audio>
      </div>
   );
}

export default App;
