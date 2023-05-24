//check if the song is playing
const playAudio = (isPlaying, audioRef) => {
   const playPromise = audioRef.current.play();
   if (playPromise !== undefined) {
      playPromise.then((audio) => {
         audioRef.current.play();
      });
   }
};

export default playAudio;