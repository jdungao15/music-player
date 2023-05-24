import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faAngleLeft,
   faAngleRight,
   faPause
} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef,setSongInfo, songInfo,songs, setCurrentSong,setSongs} ) => {
   const {currentTime, duration, animationPercentage} = songInfo;
   const {color} = currentSong;

   const playIcon = isPlaying ? faPause : faPlay;
   const activeLibraryHandler = (nextPrev) => {
      const newSongs = songs.map(song => {
         if (song.id === nextPrev.id)  {
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
   }

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

   const skipTrackHandler = async (direction) => {
      let currentIndex = songs.findIndex(song => song.id === currentSong.id);

      if(direction === 'skip-forward') {
         await setCurrentSong(songs[currentIndex + 1] || songs[0]);
         activeLibraryHandler(songs[currentIndex + 1] || songs[0])
      }
      if(direction === 'skip-back') {
         await setCurrentSong(songs[currentIndex -1] || songs[songs.length - 1]);
         activeLibraryHandler(songs[currentIndex -1] || songs[songs.length - 1])
      }
      if (isPlaying) audioRef.current.play();
   }
   //Add the styles
   const trackAnim = {
      transform: `translateX(${animationPercentage}%)`
   }

   return (
      <div className="player">
         <div className="time-control">
            <p>{getTime(currentTime)}</p>
            <div style={{background: `linear-gradient(to right, ${color[0]}, ${color[1]}`}} className="track">
               <input
                  onChange={dragHandler}
                  min={0}
                  max={duration || 0 }
                  value={currentTime}
                  type="range"
               />
               <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{duration ? getTime(duration): '0:00'}</p>
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
