import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faAngleLeft,
   faAngleRight,
   faPause
} from '@fortawesome/free-solid-svg-icons';
import song from "./Song.jsx";

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
   //State
   const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0
   });
   const {currentTime, duration} = songInfo;


   const {audio} = currentSong;
   const audioRef = useRef(null);
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
   };

   const dragHandler = (e) => {
      audioRef.current.currentTime = e.target.value;
      setSongInfo({...songInfo, currentTime: e.target.value});
   };

   const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo({...song, currentTime: current, duration});
   };

   const getTime = (t) => {
      return (
         Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2)
      );
   };


   return (
      <div className="player">
         <div className="time-control">
            <p>{getTime(currentTime)}</p>
            <input
               onChange={dragHandler}
               min={0} max={duration}
               value={currentTime}
               type="range"/>
            <p>{getTime(duration)}</p>
         </div>
         <div className="play-control">
            <FontAwesomeIcon className="skip-back" size="2x"
                             icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={playSongHandler} className="play"
                             size="2x" icon={playIcon}/>
            <FontAwesomeIcon className="skip-forward" size="2x"
                             icon={faAngleRight}/>
         </div>
         <audio onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler} ref={audioRef}
                src={audio}></audio>
      </div>
   );
};

export default Player;
