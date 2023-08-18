
const usePlayPromist = (isPlaying, audioRef) => {
 if (isPlaying) {
   const playPromis = audioRef.current?.play()
   if (playPromis !== undefined) {
     playPromis.then(() => audioRef.current?.play())
   }
 }
}
export default usePlayPromist
