import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faAngleLeft,
   faAngleRight,
   faPause
} from '@fortawesome/free-solid-svg-icons';
import song from "./Song.jsx";

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef,setSongInfo, songInfo,songs, setCurrentSong,setSongs} ) => {
   const {currentTime, duration} = songInfo;

   const playIcon = isPlaying ? faPause : faPlay;

   //UseEffect
   useEffect(() => {
      const newSongs = songs.map(song => {
         if (song.id === currentSong.id)  {
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
   },[currentSong]);

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

   const getTime = (t) => {
      return (
         Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2)
      );
   };

   const skipTrackHandler = (direction) => {
      let currentIndex = songs.findIndex(song => song.id === currentSong.id);

      if(direction === 'skip-forward') {
         setCurrentSong(songs[currentIndex + 1] || songs[0]);
      }
      if(direction === 'skip-back') {
         setCurrentSong(songs[currentIndex -1] || songs[songs.length - 1]);
      }
   }


   return (
      <div className="player">
         <div className="time-control">
            <p>{getTime(currentTime)}</p>
            <input
               onChange={dragHandler}
               min={0}
               max={duration || 0 }
               value={currentTime}
               type="range"/>
            <p>{getTime(duration)}</p>
         </div>
         <div className="play-control">
            <FontAwesomeIcon
               className="skip-back"
               size="2x"
               icon={faAngleLeft}
               onClick={()=> skipTrackHandler('skip-back')}
            />
            <FontAwesomeIcon
               onClick={playSongHandler}
               lassName="play"
               size="2x" icon={playIcon}
            />
            <FontAwesomeIcon
               className="skip-forward"
               size="2x"
               icon={faAngleRight}
               onClick={()=> skipTrackHandler('skip-forward')}
            />
         </div>

      </div>
   );
};

export default Player;
