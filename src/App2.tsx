import { useState } from 'react'
import Credite from './components/Credite'
import Library from './components/Library'
import Nav from './components/Nav'
import Player from './components/Player'
import Song from './components/Song'
import useStore from './store'

function App2() {
  const [songs, isPlaying, setisPlaying] = useStore(state => [
    state.Musics,
    state.isPlaying,
    state.setIsplaying,
  ])
  const [currentSong, setCurrentSong] = useState(songs[0])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#bdc3c73f]">
      <div className=" container mx-auto overflow-x-hidden text-xl font-bold">
        <Nav />
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          setisPlaying={setisPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
        <Library setCurrentSong={setCurrentSong} />
        <Credite />
      </div>
    </div>
  )
}

export default App2
