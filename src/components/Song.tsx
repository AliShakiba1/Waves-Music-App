import { musicProps } from '../types/music'

const Song = ({ currentSong }: musicProps) => {
  return (
    <div className=" flex flex-col items-center justify-center gap-5  ">
      <img
        src={currentSong?.cover}
        className="mt-14  w-4/6 animate-spin-slow rounded-full sm:w-2/6 "
        alt={currentSong?.name}
      />
      <h2 className=" text-gray-700 ">{currentSong?.name}</h2>
      <h3 className="  mb-2 text-gray-700 ">{currentSong?.artist}</h3>
    </div>
  )
}

export default Song
