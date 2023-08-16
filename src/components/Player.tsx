import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'
import { musicProps } from '../types/music'

type PlayerProps = {
  setisPlaying: any
  isPlaying: boolean
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
}: musicProps & PlayerProps) {
  // State
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })

  // Ref
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

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
          // ref={progressBarRef}

          onChange={handleProgressChange}
        />
        <p className="p-3">{formatTime(songInfo.duration)}</p>
      </div>
      <div className=" flex w-4/6 justify-between sm:w-2/6">
        <ChevronLeftIcon className="svg" />
        {isPlaying ? (
          <PauseIcon onClick={playSongHandler} className=" svg " />
        ) : (
          <PlayIcon onClick={playSongHandler} className=" svg " />
        )}
        <ChevronRightIcon className=" svg " />
      </div>
      <audio
        src={currentSong?.audio}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  )
}

export default Player
