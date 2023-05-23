import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faAngleLeft,
   faAngleRight,
   faPause
} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying}) => {


   const {audio} = currentSong;
   const audioRef = useRef(null)
   const playIcon = isPlaying ? faPause : faPlay;

   //EVENT HANDLERS
   const playSongHandler = () => {
      if (isPlaying) {
         audioRef.current.pause();
         setIsPlaying(!isPlaying);
      } else {
         audioRef.current.play();
         setIsPlaying(!isPlaying);
      }
   }

   //State
   const [songInfo, setSongInfo] = useState({
      currentTime: null,
      duration: null
   });
   return (
      <div className="player">
         <div className="time-control">
            <p>Start Time</p>
            <input type="range"/>
            <p>End Time</p>
         </div>
         <div className="play-control">
            <FontAwesomeIcon className="skip-back" size="2x"
                             icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={playIcon}/>
            <FontAwesomeIcon className="skip-forward" size="2x"
                             icon={faAngleRight}/>
         </div>
         <audio ref={audioRef} src={audio}></audio>
      </div>
   );
};

export default Player;
