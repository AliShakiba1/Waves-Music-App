import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useRef, useState } from 'react'
import usePlayPromist from '../custom Hook/usePlayPromise'
import useStore from '../store'
import { musicProps } from '../types/music'

type PlayerProps = {
  setisPlaying: any
  isPlaying: boolean
  setCurrentSong: any
}

const formatTime = (time: any) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60)
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(time % 60)
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${formatMinutes}:${formatSeconds}`
  }
  return '00:00'
}

function Player({
  currentSong,
  setisPlaying,
  isPlaying,
  setCurrentSong,
}: musicProps & PlayerProps) {
  // State
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })

  const [Musics, setAudioRef, setFalseAll] = useStore(state => [
    state.Musics,
    state.setAudioRef,
    state.setFalseAll,
  ])

  // Ref
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setAudioRef(audioRef)
  }, [])

  // use effect
  useEffect(() => {
    const changeFalseTrue = Musics.map(song => {
      if (song.id === currentSong.id) {
        return { ...song, active: true }
      } else {
        return { ...song, active: false }
      }
    })

    setFalseAll(changeFalseTrue)
    console.log(`first`)
  }, [currentSong])
  // event handlelr

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setisPlaying(!isPlaying)
    } else {
      setisPlaying(!isPlaying)
      audioRef.current?.play()
    }
  }

  const timeUpdateHandler = (e: any) => {
    const current = e.target.currentTime
    const duration = e.target.duration

    setsongInfo({ currentTime: current, duration: duration })
  }

  const handleProgressChange = (e: any) => {
    audioRef.current!.currentTime = e.target.value

    setsongInfo({ ...songInfo, currentTime: e.target.value })
  }

  const skipTrackHandler = (dir: string) => {
    let currentIndex = Musics.findIndex(song => song.id === currentSong.id)

    if (dir == 'skipBack') {
      if ((currentIndex - 1) % Musics.length === -1) {
        setCurrentSong(Musics[Musics.length - 1])
        usePlayPromist(isPlaying, audioRef)
        return
      }
      setCurrentSong(Musics[(currentIndex - 1) % Musics.length])
    }
    if (dir == 'skipForward') {
      setCurrentSong(Musics[(currentIndex + 1) % Musics.length])
    }

    usePlayPromist(isPlaying, audioRef)
  }

  const songEndHandler = async () => {
    let currentIndex = Musics.findIndex(song => song.id === currentSong.id)
    await setCurrentSong(Musics[(currentIndex + 1) % Musics.length])
   if (isPlaying) audioRef.current?.play()
  }

  return (
    <div className="flex h-40 flex-col items-center justify-between">
      <div className=" flex w-full justify-center ">
        <p className="p-3">{formatTime(songInfo.currentTime)}</p>
        <input
          className="m-3 w-4/6 md:w-3/6 "
          type="range"
          min="0"
          max={songInfo?.duration}
          value={songInfo?.currentTime}
          onChange={handleProgressChange}
        />
        <p className="p-3">{formatTime(songInfo.duration)}</p>
      </div>
      <div className=" flex w-4/6 justify-between sm:w-2/6">
        <ChevronLeftIcon
          onClick={() => skipTrackHandler('skipBack')}
          className="svg"
        />
        {isPlaying ? (
          <PauseIcon onClick={playSongHandler} className=" svg " />
        ) : (
          <PlayIcon onClick={playSongHandler} className=" svg " />
        )}
        <ChevronRightIcon
          onClick={() => skipTrackHandler('skipForward')}
          className=" svg "
        />
      </div>
      <audio
        src={currentSong?.audio}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default Player
