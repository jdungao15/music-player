import './styles/app.scss';
import Player from "./components/Player.jsx";
import Song from "./components/Song.jsx";
import musicData from "./data/music-data.js";
import {useState} from "react";

function App() {
   const [songs, setSongs] = useState(musicData);
   const [currentSong, setCurrentSong] = useState(songs[0]);
   const [isPlaying, setIsPlaying] = useState(false);

   return (
      <div className="App">
         <Song currentSong={currentSong}/>
         <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}/>
      </div>
   );
}

export default App;
