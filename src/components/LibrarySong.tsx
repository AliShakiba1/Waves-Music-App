import useStore from '../store'
import { musicProps } from '../types/music'

const LibrarySong = ({ currentSong, setCurrentSong }: musicProps & any) => {
  const [songs, isPlaying, setIsplaying, audioRef, setFalseAll] = useStore(
    state => [
      state.Musics,
      state.isPlaying,
      state.setIsplaying,
      state.audioRef,
      state.setFalseAll,
    ],
  )

  const songSelectHandler = () => {
    setCurrentSong(currentSong)
    const changeFalseTrue = songs.map(song => {
      if (song.id === currentSong.id) {
        return { ...song, active: true }
      } else {
        return { ...song, active: false }
      }
    })

    setFalseAll(changeFalseTrue)

    if (isPlaying) {
      const playPromis = audioRef.current?.play()
      if (playPromis !== undefined) {
        playPromis.then(() => audioRef.current?.play())
      }
    }
  }
  return (
    <li
      className={`flex  cursor-pointer self-center pb-4 pl-10  hover:bg-blue-200 ${
        currentSong.active ? 'bg-blue-100' : ''
      } `}
      onClick={songSelectHandler}
    >
      <img
        src={currentSong?.cover}
        className=" w-2/6  object-contain"
        alt={currentSong?.name}
      />
      <div className="p-4">
        <h2 className="self-center text-xl text-gray-600">
          {currentSong?.name}
        </h2>
        <h3 className=" self-center  text-lg text-gray-500 ">
          {currentSong?.artist}
        </h3>
      </div>
    </li>
  )
}

export default LibrarySong
