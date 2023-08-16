import { useState } from 'react'
import Player from './components/Player'
import Song from './components/Song'
import useStore from './store'
import Credite from './components/Credite'

function App2() {
  const songs = useStore(state => state.Musics)
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setisPlaying] = useState(false)

  return (
    <div className="h-screen w-full bg-[#bdc3c73f]">
      <div className="container mx-auto  text-xl  font-bold">
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          setisPlaying={setisPlaying}
          currentSong={currentSong}
        />
        <Credite/>
      </div>
    </div>
  )
}

export default App2
